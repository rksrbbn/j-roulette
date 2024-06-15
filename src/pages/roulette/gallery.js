import {useState, useEffect} from 'react';
import { Container, Typography, Divider, Grid, Avatar, Badge, Button } from "@mui/material";
import FooterApp from "../../components/FooterApp";
import HeaderApp from "../../components/HeaderApp";
import { getHistory } from "../../db";
import { members } from "../../membersData";
import { useNavigate } from 'react-router-dom';

function Gallery() {
    const navigate = useNavigate();
    const [memberList, setMemberList] = useState([]);
    const searchMemberDataByAlias = (alias) => {
        return members.find(member => member.alias === alias);
    };

    useEffect(() => {
        const fetchData = async () => {
            const historyData = await getHistory();
            if (historyData.length > 0) {
                const memberCount = {};
                historyData.forEach((row) => {
                    const memberName = row.memberName.trim();
                    if (!memberCount[memberName]) {
                        memberCount[memberName] = 1;
                    } else {
                        memberCount[memberName]++;
                    }
                });

                const memberObjects = Object.keys(memberCount).map(memberName => {
                    const memberData = searchMemberDataByAlias(memberName);
                    return memberData ? 
                        { ...memberData, count: memberCount[memberName] } : 
                        { alias: memberName, name: "Unknown", role: "Unknown", count: memberCount[memberName] };
                });

                setMemberList(memberObjects);
            }
        };
        fetchData();
    }, []);

    return(
        <div className='container' style={{ backgroundColor: '#FDECEF', minHeight: '100vh', marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <HeaderApp />
            <Container className="App" maxWidth="sm" style={{ textAlign: 'center', marginTop:'30px' }}>
                <Typography variant='h4' style={{ background: 'linear-gradient(to right, red, purple)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom:'20px' }}>
                   Roullete History
                </Typography>
                <Divider/>

                {memberList.length > 0 ?
                <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px', fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' }, height: '500px', overflow: 'auto' }}>
                        {memberList.map((member, index) => (
                        <Grid item xs={3} sm={3} md={3} lg={3} key={member.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                          <Badge badgeContent={'X'+member.count} color="error" anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}>
                          <Avatar
                                src={member.picture}
                                alt={member.alias}
                                style={{ marginBottom: '10px', border: '2px solid #db5198' }}
                                sx={{
                                    width: { xs: 40, sm: 40, md: 50, lg: 55 },
                                    height: { xs: 40, sm: 40, md: 50, lg: 55 }
                                }}
                            />
                            </Badge>
                             <div style={{ textAlign: 'center', width: '100%'}}>
                                <Typography component="div" style={{ color: '#db5198',  backgroundColor: '#fff', borderRadius: '4px', padding: '2px', fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' } }}>
                                    {member.alias}
                                </Typography>
                            </div>
                        </Grid>
                    ))}
                </Grid>
                :
                <div style={{ marginTop: '20px', height:'500px' }}>
                    <Typography variant='h6' style={{ background: 'linear-gradient(to right, red, purple)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>No data found</Typography>
                </div>
                }

                <Button fullWidth variant='outlined' color='error' onClick={() => navigate('/')}>HOME</Button>
            </Container>
        <FooterApp/>
        </div>
    );
}

export default Gallery;