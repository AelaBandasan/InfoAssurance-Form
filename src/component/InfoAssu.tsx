import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const InfoAssu: React.FC = () => {
  const [plaintext, setPlaintext] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const handleEncode = (): void => {
    setOutput('Encoded text');
  };

  const handleDecode = (): void => {
    setOutput('Decoded text');
  };

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
      }}>
      <Form>
        <Form.Group controlId="cipherType">
          <Form.Label 
          style={{justifyContent: 'center', 
                alignItems: 'center', 
                display: 'flex', 
                fontWeight: 700, 
                fontSize: 20}}>Cryptogram Algorithm</Form.Label>
          <div style={{ position: 'relative', width: '100%' }}>
            <Form.Control as="select" style={{ paddingRight: '30px', width: 400, height: 50}}>
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

                </i>g
          </div>
        </Form.Group>

        <Form.Group controlId="plaintext">
          <Form.Label style={{fontWeight: 600, fontSize: 17, paddingTop: 10}}>Plaintext</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={plaintext}
            placeholder='Enter text to encrypt or decrypt'
            onChange={(e) => setPlaintext(e.target.value)}

            style={{height: 150}}
          />
        </Form.Group>

        <Form.Group controlId="key">
          <Form.Label style={{fontWeight: 600, fontSize: 17, paddingTop: 10}}>Key</Form.Label>
          <Form.Control
            type="text"
            value={key}
            placeholder='Enter encryption/decryption key'
            onChange={(e) => setKey(e.target.value)}

            style={{height: 50}}
          />
        </Form.Group>

        <Row className="g-0 d-flex justify-content-between"  style={{paddingTop: 15}}>
          <Col>
            <Button variant="primary" onClick={handleEncode}
                style={{width: 195, borderRadius: 40, height: 45, backgroundColor: '#111F4D'}}>
              Encode
            </Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleDecode}
                style={{width: 195, borderRadius: 40, height: 45, backgroundColor: '#111F4D'}}>
              Decode
            </Button>
          </Col>
        </Row>

        <Form.Group controlId="output">
          <Form.Label style={{fontWeight: 600, fontSize: 17, paddingTop: 10}}>Output</Form.Label>
          <Form.Control as="textarea" rows={3} value={output} readOnly
          style={{height: 150}} />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default InfoAssu;
