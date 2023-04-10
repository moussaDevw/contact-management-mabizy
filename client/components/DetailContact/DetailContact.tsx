import React, { Fragment, MouseEventHandler, memo } from "react";
import styles from "./styles.module.css";
import { Card } from "antd";
import { Contacts } from "../../api/contact/types";
import { PrimaryButton } from "../Button/PrimaryButton";
import { useRouter } from "next/router";

interface Props {
  contact: Contacts;
  goBack: MouseEventHandler;
}
export const DetailContact = memo((props: Props) => {
  const { contact, goBack } = props;
  const router = useRouter();

  const goToUpdate = (id:string) => {
    router.push(`/updateContact/${id}`)
  }

  return (
    <Fragment>
      <Card
        className={styles.containerListContact}
        key={contact?.id}
        title={`${contact?.firstName} ${contact?.lastName}`}
        bordered={true}
      >
        <div className={styles.contactInfo}>
            <div>{contact?.number}</div>
            <div>{contact?.email}</div>
            <div className={styles.containerBtn}>
              <PrimaryButton isDanger={false} onClick={() => goToUpdate(contact?._id!)}>Modifier</PrimaryButton>
              <PrimaryButton isDanger={false} onClick={goBack}>Retour</PrimaryButton>
            </div>
          </div>
      </Card>
    </Fragment>
  );
});

DetailContact.displayName = "DetailContact";
