import { Container, Image } from 'react-bootstrap';
import SpongeBob from '../assets/spongebob-fish.gif';
function NotFound(){
    return(
        <Container className='d-flex flex-column align-items-center justify-content-center'>    
            <Image src={SpongeBob} alt="404 Not Found" height={300}/>
            <h1>Couldn't find this route. Are you sure it's correct?</h1>
        </Container>
    )
}

export default NotFound;