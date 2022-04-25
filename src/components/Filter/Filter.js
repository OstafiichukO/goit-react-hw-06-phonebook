import {
  StyledLabel,
  StyledInput,
  StyledSpan,
  StyledForm,
} from "./Filter.styled";

import { useSelector, useDispatch } from "react-redux";
import { handlerFilter } from "../../redux/store";

const Filter = () => {
  const filter = useSelector((state) => state.contacts.filter);
  const dispatch = useDispatch();

  const onChange = (e) => {
    dispatch(handlerFilter(e.currentTarget.value));
  };

  return (
    <StyledForm>
      <StyledLabel>
        <StyledSpan>Find contacts by name</StyledSpan>
        <StyledInput type="text" onChange={onChange} value={filter} />
      </StyledLabel>
    </StyledForm>
  );
};

export default Filter;
