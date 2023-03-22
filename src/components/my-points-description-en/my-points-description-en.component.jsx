import React from "react";

import styles from "./my-points-description-en.module.scss";

const MyPointsDescriptionEn = () => {
  return (
    <div className={styles.container}>
      <h3>Loyalty points program:</h3>
      <p>
        Loyalty points program is our way to express our appreciation and
        interest in you as a partner with us through gifts and special benefits
        offered to you
      </p>
      <p className={styles.strong}>Contents of the Loyalty Points Program:</p>
      <ul className={styles.first}>
        <li>
          You can subscribe to the loyalty points program for free through the
          smartphone application
        </li>
        <li>
          To participate in the loyalty points program, you must have an active
          and verified mobile number that contains WhatsApp and is issued from
          the Syrian Arab Republic.
        </li>
        <li>
          In order for us to deliver advice and offers appropriate to your
          needs, we may ask you to update your data and preferences once every
          six months.
        </li>
        <li>
          Not earning or redeeming points for a period of more than six
          consecutive months leads to the expiry of your points.
        </li>
      </ul>
      <p className={styles.strong}>How to collect points:</p>
      <ul className={styles.first}>
        <li>
          You will get only one point for each specific value purchased from one
          of the warehouses included in the loyalty points program through the
          application, which will be clear with a note below each warehouse name
          through the Warehouses section.
        </li>
        <li>
          Additional points can also be obtained through special offers on some
          products to increase your points balance.
        </li>
        <li>
          Points will be added to your account within a maximum of 24 hours of
          the purchase process.
        </li>

        <li>
          You have the right to claim any points not added to your account based
          on your purchases within a maximum of one week from the date of the
          purchase transaction using the purchase invoice.
        </li>
        <li>
          Points cannot be collected on the value of the redeemed points in
          purchases whose value or part of their value is paid using the
          redeemed points.
        </li>
      </ul>
      <p className={styles.strong}>Redeem points</p>
      <ul className={styles.first}>
        <li>
          You must contact the unified number for customer service at:
          0956660333 to inform them of replacing the points in your account and
          deducting them from part or all of the value of the last order
          immediately after requesting it directly.
        </li>
        <li>
          You can exchange points for products when you collect at least 499
          points, and the minimum exchange value is 50,000 Syrian pounds.
        </li>
        <li>
          Smart Pharma has the right to verify account ownership when requesting
          to redeem points through the customer service department.
        </li>
      </ul>
      <p className={styles.strong}>Points expire</p>
      <p>
        The validity period of the added points will be six months from the date
        of adding the first point to the account, and it will be canceled if it
        is not redeemed within the mentioned period.
      </p>
      <p className={styles.strong}>General Terms</p>
      <p>
        Non-compliance with the terms and conditions of the Loyalty Points
        Program for the Smart Pharma application, or misuse of it, or providing
        false data, leads to the cancellation or suspension of the account.
      </p>
      <p>
        Smart Pharma has the right to cancel or amend the loyalty points
        program, including these terms and conditions, at any time without prior
        notice.
      </p>
    </div>
  );
};

export default MyPointsDescriptionEn;
