import styled from "styled-components";
import { HiOutlineUserGroup } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { Logout } from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.5rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUserGroup />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
