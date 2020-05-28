import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import utilStyles from '../styles/utils.module.scss';
import useCustomForm from '../hooks/useCustomForm';

const frequencyOptions = ['weekly', 'bi-weekly', 'monthly', 'quarterly'];

export default function Home() {
  const initialValues = {
    availableHours: 0,
    userTitle: '',
    contactList: [],
  };

  const { values, updateValue, handleFormChange, handleSubmit } = useCustomForm(
    {
      initialValues,
      onSubmit: (vals) => console.log({ vals }),
    }
  );

  const [idCount, setCount] = useState(0);

  const newContact = {
    contactId: idCount,
    contactName: '',
    contactTitle: '',
    contactFrequency: null,
  };

  const [contactList, setContactState] = useState([{ ...newContact }]);

  function updateContact(e) {
    const updatedContacts = [...contactList];
    updatedContacts[e.target.dataset.idx][e.target.dataset.name] =
      e.target.value;
    setContactState(updatedContacts);
    updateValue('contactList', contactList);
  }

  useEffect(() => {
    if (idCount === 0) return;
    setContactState([...contactList, { ...newContact }]);
  }, [idCount]);

  function addContact() {
    setCount(idCount + 1);
  }

  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <form onSubmit={handleSubmit}>
          <h1 htmlFor="user" className="userName">
            Kira Pilot
          </h1>

          <label htmlFor="availableHours">
            Available # Hours
            <input
              type="text"
              name="availableHours"
              id="availableHours"
              value={values.availableHours}
              onChange={handleFormChange}
            />
          </label>

          <label htmlFor="userTitle">
            My Title
            <input
              type="text"
              name="userTitle"
              id="userTitle"
              value={values.userTitle}
              onChange={handleFormChange}
            />
          </label>

          <input type="button" value="Add a New Contact" onClick={addContact} />

          {contactList.map((val, i) => {
            const nameId = `name-${i}`;
            const titleId = `title=${i}`;
            const frequencyId = `frequency-${i}`;

            return (
              <div key={`${val.contactId}`}>
                <label htmlFor={nameId}>
                  Name
                  <input
                    type="text"
                    name="contactName"
                    id={nameId}
                    data-idx={i}
                    data-name="contactName"
                    value={contactList[i].contactName}
                    onChange={updateContact}
                  />
                </label>

                <label htmlFor={titleId}>
                  Title
                  <input
                    type="text"
                    name="contactTitle"
                    id={titleId}
                    data-idx={i}
                    data-name="contactTitle"
                    value={contactList[i].contactTitle}
                    onChange={updateContact}
                  />
                </label>

                <label htmlFor={frequencyId}>
                  Frequency
                  <select
                    name="contactFrequency"
                    id="frequencyId"
                    data-idx={i}
                    data-name="contactFrequency"
                    onChange={updateContact}
                  >
                    {frequencyOptions.map((o, idx) => (
                      // it's okay to use index as key here b/c the array is stable
                      // eslint-disable-next-line react/no-array-index-key
                      <option key={idx} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            );
          })}

          <input type="submit" value="Generate Report" />
        </form>
      </section>
      <style jsx>
        {`
          form {
            border: 0.15rem solid #000;
            width: 50%;
            margin: 1rem auto;
            padding: 1rem;
          }

          input,
          select,
          .userName {
            display: block;
          }

          input[type='button'],
          input[type='submit'] {
            margin: 1rem auto;
          }

          select {
            text-transform: capitalize;
          }
        `}
      </style>
    </Layout>
  );
}
