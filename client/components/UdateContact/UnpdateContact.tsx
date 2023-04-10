import React, { ChangeEvent, Fragment, memo, useEffect, useState } from "react";
import { FormInput } from "../FormInput/FormInput";
import { PrimaryButton } from "../Button/PrimaryButton";
import styles from "./styles.module.css";
import { UserAddOutlined, MailOutlined, PhoneFilled } from "@ant-design/icons";
import { useUpdateContactMutation } from "../../api/contact";
import { Contacts, NewContact } from "../../api/contact/types";
import { AlertInfo } from "../AlertInfo/AlertInfo";
import { useRouter } from "next/router";

interface Props {
    contact:Contacts
}

export const UpdateContact = memo((props:Props) => {
  const router = useRouter()
  const { contact } = props;
  const [updateContact, { isLoading, isSuccess }] = useUpdateContactMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState<number>();
  const [id, setId] = useState("")
  const [error, setError] = useState("");
  const [isInfo, setIsInfo] = useState(false);

  useEffect(() => {
    setFirstName(contact?.firstName)
  },[contact?.firstName])

  useEffect(() => {
    setLastName(contact?.lastName)
  },[contact?.lastName])

  useEffect(() => {
    setEmail(contact?.email)
  },[contact?.email])

  useEffect(() => {
    setNumber(contact?.number)
  },[contact?.number])

  useEffect(() => {
    setId(contact?._id!)
  },[contact?._id])

  const handleChangeFirtName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFirstName(value);
  };
  
  const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLastName(value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumber(Number(value));
  };

  const handleSubmitContact = () => {
    if (!firstName || !lastName || !email || !number) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const contact: Contacts = {
      id,
      firstName,
      lastName,
      email,
      number,
    };

    updateContact(contact)
      .unwrap()
      .then((response: Contacts) => {
        console.log(response);
        router.back()
      })
      .catch((error: any) => {
        setError(error?.data?.message);
      });
  };

  useEffect(() => {
    if (error) {
      setIsInfo(true);
    }
  }, [error, isLoading]);

  return (
    <Fragment>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={styles.containerForm}
      >
        {isInfo && !!error ? (
          <AlertInfo
            message={error}
            type={"warning"}
            onClose={() => setIsInfo(false)}
          />
        ) : (
          ""
        )}
        {isSuccess ? (
          <AlertInfo
            message="Contact ajouté avec succès."
            type="success"
            onClose={() => setIsInfo(false)}
          />
        ) : (
          ""
        )}
        <FormInput
          placeholder="Prénom"
          type="text"
          onChange={handleChangeFirtName}
          value={firstName}
          prefix={<UserAddOutlined />}
        />
        <FormInput
          placeholder="Nom"
          type="text"
          onChange={handleChangeLastName}
          value={lastName}
          prefix={<UserAddOutlined />}
        />
        <FormInput
          placeholder="Email"
          type="mail"
          onChange={handleChangeEmail}
          value={email}
          prefix={<MailOutlined />}
        />
        <FormInput
          placeholder="Numéro de téléphone"
          type="number"
          onChange={handleChangeNumber}
          value={number!}
          prefix={<PhoneFilled />}
        />
        <div className={styles.containerBtn}>
          <PrimaryButton isDanger onClick={handleSubmitContact!}>
            {isLoading ? "Loading ..." : "Modifier"}
          </PrimaryButton>
          <PrimaryButton isDanger={false} onClick={() => console.log("k")}>
            Annuler
          </PrimaryButton>
        </div>
      </form>
    </Fragment>
  );
});

UpdateContact.displayName = "UpdateContact";
