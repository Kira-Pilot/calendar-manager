import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout/Layout';
import utilStyles from '../styles/utils.module.scss';
import useCustomForm from '../hooks/useCustomForm';
import getAllContacts from '../lib/contacts';

const frequencyOptions = ['weekly', 'bi-weekly', 'monthly', 'quarterly'];

export async function getStaticProps() {
  const allContacts = getAllContacts();
  return {
    props: {
      allContacts,
    },
  };
}

export default function Contacts({ allContacts }) {
  const form = {
    availableHours: 0,
    userTitle: '',
    contactList: allContacts,
  };

  const { values, updateValue, handleFormChange, handleSubmit } = useCustomForm(
    {
      form,
      onSubmit: (vals) => console.log({ vals }),
    }
  );

  const [idCount, setCount] = useState(form.contactList.length + 1);

  const [newContact, setNewContact] = useState({
    id: idCount.toString(),
    name: '',
    title: '',
    frequency: 'weekly',
    created: '',
    override: '',
  });

  const [contactList, setContactsState] = useState([...form.contactList]);

  function updateContact(e) {
    const updatedContacts = [...contactList];

    updatedContacts[e.target.dataset.idx][e.target.dataset.name] =
      e.target.value;

    setContactsState(updatedContacts);
    updateValue('contactList', contactList);
  }

  useEffect(() => {
    if (idCount === 0) return;

    newContact.id = idCount.toString();
    setNewContact({ ...newContact });
    setContactsState([...contactList, newContact]);
  }, [idCount]);

  function addContact() {
    setCount(idCount + 1);
  }

  return (
    <Layout>
      <section className={utilStyles.headingMd}>
        <form onSubmit={handleSubmit}>
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

          {contactList.map((val, i) => {
            const nameId = `name-${i}`;
            const titleId = `title=${i}`;
            const frequencyId = `frequency-${i}`;

            return (
              <div key={`${val.id}`}>
                <label htmlFor={nameId}>
                  Name
                  <input
                    type="text"
                    name="name"
                    id={nameId}
                    data-idx={i}
                    data-name="name"
                    value={contactList[i].name}
                    onChange={updateContact}
                  />
                </label>

                <label htmlFor={titleId}>
                  Title
                  <input
                    type="text"
                    name="title"
                    id={titleId}
                    data-idx={i}
                    data-name="title"
                    value={contactList[i].title}
                    onChange={updateContact}
                  />
                </label>

                <label htmlFor={frequencyId}>
                  Frequency
                  <select
                    name="frequency"
                    id="frequencyId"
                    data-idx={i}
                    data-name="frequency"
                    value={contactList[i].frequency}
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
          <input type="button" value="Add a New Contact" onClick={addContact} />

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
          select {
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

const Contact = PropTypes.shape({
  contactName: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  frequency: PropTypes.string,
  created: PropTypes.string,
  override: PropTypes.string,
});

Contacts.propTypes = {
  allContacts: PropTypes.arrayOf(Contact),
};

Contacts.defaultProps = {
  allContacts: [],
};
