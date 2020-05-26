import {useState} from 'react';
import Layout from '../components/Layout'
import utilStyles from '../styles/utils.module.scss'

export default function Home() {
  const frequencyOptions = ["weekly", "bi-weekly", "monthly", "quarterly"];

  const newContact = {contactName: '', contactTitle: '', contactFrequency: null}
  const [contactList, setContactState] = useState([{...newContact}]);

  let [availableHours, setAvailableHours] = useState(0);

  function addContact() {
    setContactState([...contactList, {...newContact}]);
  }

  function updateHours(e) {
    setAvailableHours((availableHours = e.target.value));
    console.log("Avail", availableHours);
  }

  function updateContact(e) {
    const updatedContacts = [...contactList];
    updatedContacts[e.target.dataset.idx][e.target.dataset.name] = e.target.value;
    setContactState(updatedContacts);
    console.log('all set', updatedContacts)
  }

  return (
  <Layout home>
      <section className={utilStyles.headingMd}>
        <form>
          <h1 htmlFor="user" className="userName">Kira Pilot</h1>
          <label htmlFor="availableHours">Available # Hours</label>
          <input type="hours" name="hours" id="hours" onChange={updateHours}/>
          <input type="button" value="Add a New Contact" onClick={addContact}/>

          {contactList.map((val, i) => {
            const nameId = `name-${i}`;
            const titleId = `title=${i}`;
            const frequencyId = `frequency-${i}`

            return (
              <div key={`contact-${i}`}>
                <label htmlFor={nameId}>Name</label>
                <input
                  type="text"
                  name="contactName"
                  id={nameId}
                  data-idx={i}
                  data-name="contactName"
                  value={contactList[i].contactName}
                  onChange={updateContact}
                />

                <label htmlFor={titleId}>Title</label>
                <input
                  type="text"
                  name="contactTitle"
                  id={titleId}
                  data-idx={i}
                  data-name="contactTitle"
                  value={contactList[i].contactTitle}
                  onChange={updateContact}
                />

                <label htmlFor={frequencyId}>Frequency</label>
                <select 
                  name="contactFrequency"
                  id="frequencyId"
                  data-idx={i}
                  data-name="contactFrequency"
                  onChange={updateContact}>
                    {frequencyOptions.map((o, i) => {
                      return (<option key={i} value={o}>{o}</option>)
                    })}
                </select>

              </div>
            )
          })}


          <input type="submit" value="Generate Report"/>
        </form>
      </section>
      <style jsx>{`
        form {
          border: 0.15rem solid #000;
          width: 50%;
          margin: 1rem auto;
          padding: 1rem;
        }

        input, select, .userName { display: block; }
          
        input[type="button"], input[type="submit"] { margin: 1rem auto; }

        select { text-transform: capitalize; }
      `}</style>
    </Layout>
  )
}