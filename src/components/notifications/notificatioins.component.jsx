import React from "react";
import { useSelector } from "react-redux";
import { selectNotifications } from "../../redux/notifications/notificationsSlice";
import NotificationRow from "../notification-row/notification-row.component";

function Notifications() {
  const { notifications, error, status } = useSelector(selectNotifications);

  return (
    <>
      {notifications &&
        notifications.map((note, index) => (
          <NotificationRow key={note._id} notification={note} index={index} />
        ))}
    </>
  );
}

export default Notifications;
