import { Container, Typography, Divider } from "@mui/material";
import FooterApp from "../../components/FooterApp";
import HeaderApp from "../../components/HeaderApp";
import { getHistory } from "../../db";
import { members } from "../../membersData";

function Gallery() {

    const history = getHistory();

    return(
        <div className='container' style={{ backgroundColor: '#FDECEF', minHeight: '100vh', marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <HeaderApp />
            <Container className="App" maxWidth="sm" style={{ textAlign: 'center', marginTop:'30px' }}>
                <Typography variant='h4' style={{ background: 'linear-gradient(to right, red, purple)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom:'20px' }}>
                   Roullete History
                </Typography>
                <Divider/>
            </Container>
        <FooterApp/>
        </div>
    );
}

export default Gallery;