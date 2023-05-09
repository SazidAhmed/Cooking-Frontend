import {useSelector} from 'react-redux';

import CookingLogo from 'assets/logos/cooking.png';
import Button from 'components/Button';
import {useSelfDisplayImage, useToggle} from 'hooks';
import CreateAccountModal from 'modals/CreateAccountModal';
import LogInModal from 'modals/LogInModal';
import {getSelf} from 'selectors/state';
import {SFC} from 'types/generic';
import * as S from './Styles';

const TopNav: SFC = ({className}) => {
  const [createAccountModalIsOpen, toggleCreateAccountModal] = useToggle(false);
  const [logInModalIsOpen, toggleLogInModal] = useToggle(false);
  const self = useSelector(getSelf);
  const selfDisplayImage = useSelfDisplayImage();

  const renderRightContent = () => {
    if (!self.accountNumber) {
      return (
        <>
          <Button onClick={toggleCreateAccountModal} text="Create Account" />
          <Button onClick={toggleLogInModal} text="Log In" />
        </>
      );
    }

    return <S.Avatar alt="avatar" src={selfDisplayImage} />;
  };

  return (
    <>
      <S.Container className={className}>
        <S.Left>
          <S.Logo alt="logo" src={CookingLogo} />
        </S.Left>
        <S.Right>{renderRightContent()}</S.Right>
      </S.Container>
      {createAccountModalIsOpen ? <CreateAccountModal close={toggleCreateAccountModal} /> : null}
      {logInModalIsOpen ? <LogInModal close={toggleLogInModal} /> : null}
    </>
  );
};

export default TopNav;