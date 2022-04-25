import {
  StyledUl,
  StyledLi,
  StyledSpan,
  StyledButton,
} from "./ContactList.styled";

import { useSelector, useDispatch } from "react-redux";
import { removeContact } from "../../redux/store";

const ContactsList = () => {
  const dispatch = useDispatch();
  const contactsShown = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);

  let contacts = "";
  if (contactsShown) {
    contacts = contactsShown.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
  return (
    <>
      <StyledUl>
        {contacts &&
          contacts.map(({ id, name, phone }) => (
            <StyledLi key={id}>
              <StyledSpan>
                &#9742; {name}: {phone}
              </StyledSpan>
              <StyledButton
                type="button"
                name={id}
                onClick={() => dispatch(removeContact(id))}
              >
                Delete
              </StyledButton>
            </StyledLi>
          ))}
      </StyledUl>
    </>
  );
};

export default ContactsList;
