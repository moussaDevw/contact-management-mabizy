import { Card } from "antd";
import React, { Fragment, memo, useCallback, useState } from "react";
import styles from "./styles.module.css";
import { Contacts } from "../../api/contact/types";
import { PrimaryButton } from "../Button/PrimaryButton";
import { useDeleteContactMutation } from "../../api/contact";
import { AlertInfo } from "../AlertInfo/AlertInfo";
import { useRouter } from "next/router";

interface Props {
  contacts: Contacts[];
}

export const ListContact = memo((props: Props) => {
  const router = useRouter();

  const { contacts } = props;
  const [deleteContact, { isSuccess }] = useDeleteContactMutation();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  
  const handleRemoveItem = useCallback(
    (id: string) => () => {
      if (id) {
        deleteContact(id!)
          .unwrap()
          .then((response) => {
            console.log(response.message);
            setMessage(response.message);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    []
  );

  const goToDetailContact = (id: string) => {
    router.push(`/detailContact/${id}`);
  };

  const goToAddContact = () => {
    router.push(`addContact`)
    setIsLoading(true)
  }

  return (
    <Fragment>
      {isSuccess && <AlertInfo type="success" message={message} />}
      {!!contacts?.length ? (
        contacts?.map((contact) => (
          <Card
            className={styles.containerListContact}
            key={contact?.id}
            title={`${contact?.firstName} ${contact?.lastName}`}
            bordered={true}
          >
            <div className={styles.contactInfo}>
              <div>{contact?.number}</div>
              <div className={styles.containerBtn}>
                <PrimaryButton
                  isDanger={false}
                  onClick={() => goToDetailContact(contact?.id)}
                >
                  Details
                </PrimaryButton>
                <PrimaryButton isDanger onClick={handleRemoveItem(contact?.id)}>
                  Supprimer
                </PrimaryButton>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className={styles.msgWelcome}>
          <h6>Bienvenue dans votre portail de gestion de contacts</h6>
          <PrimaryButton isDanger={false} onClick={goToAddContact}>{isLoading ? "Loading ..." : "Ajoutez votre premier numéro"}</PrimaryButton>
        </div>
      )}
    </Fragment>
  );
});

ListContact.displayName = "ListContact";
