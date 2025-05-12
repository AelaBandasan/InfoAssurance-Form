import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import {columnarEncrypt, columnarDecrypt, vigenereEncrypt, vigenereDecrypt} from '../component/cipher';

const InfoAssu: React.FC = () => {
  const [plaintext, setPlaintext] = useState<string>('');
  const [ciphertext, setCiphertext] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [cipherType, setCipherType] = useState('Vigenère Cipher');

  const handleEncode = () => {
  if (cipherType === "Vigenère Cipher") {
    setCiphertext(vigenereEncrypt(plaintext, key));
  } else {
    setCiphertext(columnarEncrypt(plaintext, key));
  }
};

  const handleDecode = (): void => {
    if (cipherType === "Vigenère Cipher") {
      setCiphertext(vigenereDecrypt(plaintext, key));
    } else {
      setCiphertext(columnarDecrypt(plaintext, key));
    }
  };

  


  return (
    <Container className='shadow'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 500,
        marginTop: 50,
        backgroundColor: '#FBFBFB',
        borderRadius: 10
      }}>
      <Form>
        <Form.Group controlId="cipherType">
          <Form.Label 
          style={{justifyContent: 'center', 
                alignItems: 'center', 
                display: 'flex', 
                fontWeight: 700, 
                fontSize: 22,
                paddingTop: 30,
                }}>Cryptogram Algorithm</Form.Label>
          <div style={{ position: 'relative', width: '100%' }}>
            <Form.Control as="select" value={cipherType} onChange={(e) =>setCipherType(e.target.value)}
              
              style={{ fontSize: 17, paddingRight: '30px', width: 400, height: 50, borderWidth: 2, borderColor: '#4C585B'}}>
              <option>Vigenère Cipher </option>
              <option>Standard Columnar Transposition Cipher</option>
            </Form.Control>
            <i className="bi bi-chevron-down" 
                style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none", // Prevents interaction issues
                    fontSize: "20px" // Adjusts the size of the icon
                }}>

                </i>
          </div>
        </Form.Group>

        <Form.Group controlId="plaintext">
          <Form.Label style={{fontWeight: 600, fontSize: 18, paddingTop: 10, }}>Plaintext</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={plaintext}
            placeholder='Enter text to encrypt or decrypt'
            onChange={(e) => setPlaintext(e.target.value)}

            style={{fontSize: 17, color: 'black', height: 150, borderWidth: 2, borderColor: '#4C585B'}}
          />
        </Form.Group>

        <Form.Group controlId="key">
          <Form.Label style={{fontWeight: 600, fontSize: 18, paddingTop: 10}}>Key</Form.Label>
          <Form.Control
            type="text"
            value={key}
            placeholder='Enter encryption/decryption key'
            onChange={(e) => setKey(e.target.value)}

            style={{fontSize: 17, color: 'black',height: 50, borderWidth: 2, borderColor: '#4C585B'}}
          />
        </Form.Group>

        <Row className="g-0 d-flex justify-content-between"  style={{paddingTop: 15}}>
          <Col>
            <Button variant="primary" onClick={handleEncode}
                style={{width: 195, borderRadius: 40, height: 45, backgroundColor: '#111F4D', fontWeight: 600, fontSize: 17}}>
              Encode
            </Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleDecode}
                style={{width: 195, borderRadius: 40, height: 45, backgroundColor: '#111F4D', fontWeight: 600, fontSize: 17}}>
              Decode
            </Button>
          </Col>
        </Row>

        <Form.Group controlId="output">
          <Form.Label style={{fontWeight: 600, fontSize: 18, paddingTop: 10}}>Cyphertext</Form.Label>
          <Form.Control as="textarea" 
                        rows={3} 
                        value={ciphertext}
                        onChange={(e) => setCiphertext(e.target.value)}
          style={{fontSize: 17,height: 150, borderWidth: 2, color: 'black',borderColor: '#4C585B', marginBottom: 50}} />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default InfoAssu;
