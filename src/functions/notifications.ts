import { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import { router } from "expo-router";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import useStore from "../store/store";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface PushNotificationState {
  expoPushToken?: string;
  notification?: Notifications.Notification;
  channels?: Notifications.NotificationChannel[];
}

export const usePushNotifications = (): PushNotificationState => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    [],
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token),
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? []),
      );
    }
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      },
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return {
    expoPushToken,
    notification,
    channels,
  };
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("myNotificationChannel", {
      name: "A channel is needed for the permissions prompt to appear",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    Alert.alert("Failed to get push token for push notification!");
    return;
  }
  // Learn more about projectId:
  // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  // EAS projectId is used here.
  try {
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      throw new Error("Project ID not found");
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    console.log(token);
  } catch (e) {
    token = `${e}`;
  }

  return token;
}

const PET_OF_THE_DAY_NOTIFICATION_ID = "pet-of-the-day-notification";

export async function schedulePushNotification() {
  await Notifications.cancelScheduledNotificationAsync(
    PET_OF_THE_DAY_NOTIFICATION_ID,
  );

  await Notifications.scheduleNotificationAsync({
    identifier: PET_OF_THE_DAY_NOTIFICATION_ID,
    content: {
      title: "Hi, this is the pet of the day :)",
      body: "I miss you. Please come over and give me a hug.",
      data: {},
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 12,
      minute: 0,
    },
  });
}

function redirectToNotificationScreen(isSignedIn: boolean | null) {
  const targetRoute = isSignedIn
    ? "/(petoftheday)/petoftheday"
    : "/(auth)/login";

  router.replace(targetRoute);
}

export function useNotificationObserver() {
  const isAppReady = useStore((state) => state.isAppReady);
  const isSignedIn = useStore((state) => state.isSignedIn);
  const [pendingNotification, setPendingNotification] =
    useState<Notifications.Notification | null>(null);

  useEffect(() => {
    const response = Notifications.getLastNotificationResponse();
    if (response?.notification) {
      setPendingNotification(response.notification);
    }

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        setPendingNotification(response.notification);
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!pendingNotification || !isAppReady) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setPendingNotification(null);

      Notifications.clearLastNotificationResponse();

      redirectToNotificationScreen(isSignedIn);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pendingNotification, isAppReady, isSignedIn]);

  return pendingNotification !== null;
}
