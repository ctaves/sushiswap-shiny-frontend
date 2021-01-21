import Modal, { ModalProps } from "../Modal";
import React, { useEffect } from "react";

import Button from "../Button";
import ModalActions from "../ModalActions";
import ModalContent from "../ModalContent";
import ModalTitle from "../ModalTitle";
import Spacer from "../Spacer";
import WalletCard from "./components/WalletCard";
import metamaskLogo from "../../assets/img/metamask-fox.svg";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import walletConnectLogo from "../../assets/img/wallet-connect.svg";

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect } = useWallet();

  useEffect(() => {
    if (account && onDismiss) {
      onDismiss();
    }
  }, [account, onDismiss]);

  return (
    <Modal>
      <ModalTitle text="Select a wallet provider." />

      <ModalContent>
        <StyledWalletsWrapper>
          <StyledWalletCard>
            <WalletCard
              icon={<img src={metamaskLogo} style={{ height: 32 }} />}
              onConnect={() => connect("injected")}
              title="Metamask"
            />
          </StyledWalletCard>
          <Spacer size="sm" />
          <StyledWalletCard>
            <WalletCard
              icon={<img src={walletConnectLogo} style={{ height: 24 }} />}
              onConnect={() => connect("walletconnect")}
              title="WalletConnect"
            />
          </StyledWalletCard>
        </StyledWalletsWrapper>
      </ModalContent>

      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
      </ModalActions>
    </Modal>
  );
};

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoint.mobile}px) {
    flex-direction: column;
    flex-wrap: none;
  }
`;

const StyledWalletCard = styled.div`
  flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);
`;

export default WalletProviderModal;
