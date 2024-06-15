import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { Container } from '@mui/material';
import HeaderApp from '../../components/HeaderApp';
import FooterApp from '../../components/FooterApp';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { members } from '../../membersData';

const Roulette = () => {
  const navigate = useNavigate();

  const [number, setNumber] = useState(0);
  const [pickNumber, setPickNumber] = useState(0);
  const [isPicking, setIsPicking] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [lineup, setLineup] = useState([]);

//   set linup dengan 16 member acak dari data members masukkan property alias saja ke dalam lineup
  useEffect(() => {
    const shuffledMembers = members.sort(() => 0.5 - Math.random());
    setLineup(shuffledMembers.slice(0, 16).map(member => member.alias));
  }, []);

  // Fungsi untuk menghasilkan angka acak antara 1 dan 130
  const getRandomNumber = (totalNum=130) => {
    return Math.floor(Math.random() * totalNum) + 1;
  };

  // Fungsi untuk memulai animasi angka acak
  const startRandomNumber = () => {
    const id = setInterval(() => {
      setNumber(getRandomNumber(130));
    }, 100); // Ubah angka setiap 100ms
    setIntervalId(id);
  };

  // Fungsi untuk menghentikan animasi dan menampilkan angka yang dipilih
  const stopRandomNumber = () => {
    clearInterval(intervalId);
    setPickNumber(number);
    setIsPicking(false);
  };

  const handleButtonClick = () => {
    if (!isPicking) {
      setIsPicking(true);
      startRandomNumber();
    } else {
      stopRandomNumber();
    }
  };

//   handleReset
  const handleReset = () => {
    setNumber(0);
    setPickNumber(0);
    setIsPicking(false);
    setWinner([]);
  }

  const [winner, setWinner] = useState([]);

  const handleWinner = () => {
    const winners = new Set();
    const interval = setInterval(() => {
      const newNumber = getRandomNumber(130);
      if (!winners.has(newNumber)) {
        winners.add(newNumber);
        setWinner(Array.from(winners));
      }
      if (winners.size >= 48) {
        clearInterval(interval);
      }
    }, 300); // Tambahkan angka setiap 300ms
  }

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [winner]);
  
  const [rNum, setRNum] = useState(0);
  const [isPickRNum, setIsPickRNum] = useState(false);

  const handleRNum = () => {
    setIsPickRNum(true);
    setRNum(getRandomNumber(48));
    setWinner([]);
  }

  return (
    <div className='container' style={{ backgroundColor: '#FDECEF', minHeight: '100vh', marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <HeaderApp />
        <Container className="App" maxWidth="sm" style={{ textAlign: 'center' }}>
        <p style={{ textDecoration: 'underline', cursor: 'pointer', color: '#f50057', fontSize: '12px', textAlign: 'left' }} onClick={() => navigate('/')}>Back to Home</p>

            <Typography variant='h6' style={{ background: 'linear-gradient(to right, red, purple)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Current Lineup</Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <small style={{ background: 'linear-gradient(to right, red, purple)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{lineup.join(', ')}</small>
            </div>


            <Typography variant="h4" style={{color:'#f50057'}}>{number}</Typography>
            {pickNumber === 0 && (
            <Button onClick={handleButtonClick}>
                {isPicking ? 'Stop Number' : 'Pick Number'}
            </Button>
            )}
            {pickNumber !== 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <small style={{color:'#f50057'}}>Your Queue Number is {pickNumber}!</small>
                    <Button onClick={() => {
                        handleReset();
                    }}>
                        Reset
                    </Button>

                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        {winner.length > 0 ? (
                            <Typography style={{ color: '#f50057' }}>Winners List</Typography>
                        ) : winner.length === 0 && !isPickRNum ? (
                            <Button onClick={handleWinner} fullWidth variant='contained' color='warning'>Start Pick Random Winner</Button>
                        ) : winner.length === 0 && isPickRNum ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography style={{ color: '#f50057' }}>Your Roulette Number is {rNum}</Typography>
                                <Button variant='outlined' color='error' onClick={() => setIsPickRNum(false)}>Start Roulette Member</Button>
                            </div>
                        ) : null}
                    </div>

                    {winner.length > 0 && (
                        <div 
                        className="scroll-container"
                        ref={containerRef}
                        style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', maxHeight: '200px', overflowY: 'auto', backgroundColor: '#fff', padding: '10px', borderRadius: '10px' }}>
                            {winner.map((win, index) => (
                                <small key={index} style={{color: win === pickNumber ? 'gold' : '#f50057', fontWeight: win === pickNumber ? 'bold' : 'normal'}}>
                                    {index + 1}. Number {win} Won a Roulette!
                                </small>
                            ))}
                    </div>
                    )}

                    {winner.length >= 48 && (
                        <Button onClick={() => setWinner([])}>Reset Winner</Button>
                    )}

                    {/* Jika pickNumber tidak ada di dalam winner tampilkan pesan "You Don't Won a Roulette" */}
                    {pickNumber !== 0 && winner.length >= 48 && !winner.includes(pickNumber) ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <small style={{color:'#f50057'}}>Sorry, You didn't win the roulette!</small>
                            <Button onClick={handleReset}>Try Again</Button>
                        </div>
                    ) : pickNumber !== 0 && winner.length >= 48 && winner.includes(pickNumber) ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <small style={{color:'#f50057'}}>You have Win a Roulette!</small>
                            <Button variant='outlined'  color='error' onClick={handleRNum}>Get Your Roulette Number</Button>
                        </div>
                    ) : null}
                </div>
                
            )}

        </Container>
        <FooterApp />
    </div>
  );
};

export default Roulette;
