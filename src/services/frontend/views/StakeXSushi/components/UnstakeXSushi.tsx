import React, {useState} from 'react'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import {Contract} from "web3-eth-contract";
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import WithdrawModal from "./WithdrawModal";
import {getBalanceNumber} from '../../../utils/formatBalance'
import styled from 'styled-components'
import useLeave from "../../../hooks/useLeave";
import useModal from "../../../hooks/useModal";
import useReward from '../../../hooks/useReward'
import useTokenBalance from "../../../hooks/useTokenBalance";

interface HarvestProps {
  lpContract: any
}

const UnstakeXSushi: React.FC<HarvestProps> = ({lpContract}) => {

  const xSushiBalance = useTokenBalance(lpContract.options.address)
  const [pendingTx, setPendingTx] = useState(false)

  const {onLeave} = useLeave()

  const tokenName = "xSUSHI"

  const [onPresentLeave] = useModal(
    <WithdrawModal
      max={xSushiBalance}
      onConfirm={onLeave}
      tokenName={tokenName}
    />,
  )

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>🍣</CardIcon>
            <Value value={getBalanceNumber(xSushiBalance)}/>
            <Label text="xSUSHI (SushiBar) Available"/>
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              disabled={!xSushiBalance.toNumber() || pendingTx}
              text={pendingTx ? 'Converting to SUSHI' : 'Convert to SUSHI'}
              onClick={async () => {
                setPendingTx(true)
                await onPresentLeave()
                setPendingTx(false)
              }}
            />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default UnstakeXSushi
