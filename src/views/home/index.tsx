import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Col, Row, Card } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { ConnectButton } from '../../components/ConnectButton';
import { useNativeAccount } from '../../contexts/accounts';
import { useConnectionConfig } from '../../contexts/connection';
import { useMarkets } from '../../contexts/market';
import { formatNumber } from '../../utils/utils';

const stakeHammer = require('../../img/stakeHammer.svg');
const potionHero = require('../../img/potionHero.svg');
const friends = require('../../img/friends.svg');
const solanaLogo = require('../../img/solanaLogo.svg');
const polygonLogo = require("../../img/polygonDark.svg");
const keepLogo = require("../../img/keep.svg")
const hammer = require("../../img/hammer.svg");
const meat = require("../../img/meat.svg");

export const HomeView = () => {
  const { marketEmitter, midPriceInUSD } = useMarkets();
  const { tokenMap } = useConnectionConfig();
  const { account } = useNativeAccount();

  const balance = useMemo(
    () => formatNumber.format((account?.lamports || 0) / LAMPORTS_PER_SOL),
    [account]
  );

  let history = useHistory();
  const handleClick = (to: string) => {
    history.push(to);
  };

  useEffect(() => {
    const refreshTotal = () => {};

    const dispose = marketEmitter.onMarket(() => {
      refreshTotal();
    });

    refreshTotal();

    return () => {
      dispose();
    };
  }, [marketEmitter, midPriceInUSD, tokenMap]);

  return (
    <Row gutter={[48, 48]} align='middle'>
      <Col
        span={24}
        style={{
          marginTop:"90px",
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems:'center'
        }}
      >
        
          <h2 className='title' style={{ marginTop: '1em', marginBottom: 0 }}>
            The easiest way to stake your tokens
          </h2>
          <h2 className='title' style={{ marginTop: 0 }}>
            and get rewards
          </h2>
          <h3 className='subtext' style={{ marginBottom: '2em' }}>
            Enjoy automatic reinvestment of rewards and immediate access to
            staked tokens.
            {/* Making
            <span style={{ color: '#4E66DE', fontWeight: 900 }}>
              {' stake easier '}
            </span>
            to chew. */}
          </h3>
          <div style={{position: "relative"}}>
            <img id="meat" width="100" src={meat} alt="logo" />
            <img id="hammer" width="130" src={hammer} alt="logo" />
          </div>
      </Col>
      <Col
        span={22}
        offset={1}
        style={{
          height: '450',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Card className='card' style={{ width: '30%' }}>
        <div style={{
                height: "100%",
                display: "flex", 
                flexDirection:"column", 
                justifyContent:"space-between",
                alignItems:'center'}}>
              <div>
                <img src={polygonLogo} alt="polygon logo" style={{maxWidth:"70%"}}/>
                <h2 className="subtext" style={{marginTop:"5px"}}>POLYGON</h2>
              </div>
              <div style={{marginTop: "5px", marginBottom:"5px"}}>
                <h2 className="title" style={{marginBottom: 0}}>10.2%</h2>
                <h3 style={{marginBottom: 0}}>Vault Rewards</h3>
                <h5>(projected APY)</h5>
              </div>
                <ConnectButton className="tenderButton tenderButtonLight">Coming Soon</ConnectButton>
            </div>
        </Card>
        <Card className='card' style={{ width: '30%', height: '100%' }}>
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <img
                src={solanaLogo}
                alt='solana logo'
                style={{ maxWidth: '70%' }}
              />
              <h2 className='subtext' style={{ marginTop: '5px' }}>
                SOLANA
              </h2>
            </div>
            <div style={{ marginTop: '5px', marginBottom: '5px' }}>
              <h2 className='title' style={{ marginBottom: 0 }}>
                15.5%
              </h2>
              <h3 style={{ marginBottom: 0 }}>Vault Rewards</h3>
              <h5>(projected APY)</h5>
            </div>
            <ConnectButton
              className='tenderButton tenderButtonShade'
              onClick={() => handleClick('/discover')}
            >
              Stake
            </ConnectButton>

            {/* <Link to="/discover">
                <Button className="tenderButton tenderButtonShade">Stake</Button>
              </Link> */}
          </div>
        </Card>
        <Card className='card' style={{ width: '30%' }}>
        <div style={{
                height: "100%",
                display: "flex", 
                flexDirection:"column", 
                justifyContent:"space-between",
                alignItems:'center'
                }}>
              <div>
                <img src={keepLogo} alt="keep logo" style={{maxWidth:"100%"}}/>
                <h2 className="subtext" style={{marginTop:"5px"}}>KEEP</h2>
              </div>
              <div style={{marginTop: "5px", marginBottom:"5px"}}>
                <h2 className="title" style={{marginBottom: 0}}>9.8%</h2>
                <h3 style={{marginBottom: 0}}>Vault Rewards</h3>
                <h5>(projected APY)</h5>
              </div>
              <ConnectButton className="tenderButton tenderButtonLight">Coming Soon</ConnectButton>
            </div>
        </Card>
      </Col>
      <Col span={10} offset={2}>
        <div style={{ marginTop: '100px', marginBottom: '70px' }}>
          <img style={{ maxWidth: '100%' }} src={potionHero} alt='potionHero' />
        </div>
      </Col>
      <Col span={10}>
        <p className='subtext'> Tenderize is a liquid staking protocol. </p>
        <p className='subtext'>
          {' '}
          It allows you to enjoy your farm-fresh, tender staking returns without
          the wait of an unbonding period (1-3 months in the case of Keep).
        </p>
      </Col>
      <Col span={24}>
        <div style={{ height: '70vh', marginBottom: '30px' }}>
          <div className='table card'>
            <div>
              <span className='subtext table-left'>Step 1</span>
              <p className='subtext'>
                Order off of our select, stake menu. Deposit your stake and let
                the tenderizing begin.
              </p>
            </div>
            <div>
              <span className='subtext table-left'>Step 2</span>
              <p className='regulartext'>
                Receive a freshly minted, tender token that represents your
                initial stake and any earned rewards.
              </p>
            </div>
            <div>
              <span className='subtext table-left'>Step 3</span>
              <p className='regulartext'>
                With your new tender token, you can skip the wait of your
                stake’s unbonding period. Go utilize, liquidize, and
                collateralize...all while you tenderize.
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col span={12} offset={2}>
        <div style={{ marginTop: '80px', marginBottom: '100px' }}>
          <img style={{ maxWidth: '100%' }} src={friends} alt='friends' />
        </div>
      </Col>
      <Col span={8}>
        <p className='subtext'>
          Friends don’t let friends stake, unless they tenderize.
        </p>
      </Col>
      <Col span={24}>
        <div className='builton' />
      </Col>
    </Row>
  );
};
