// components/FormularioCategoria.js
"use client";

import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

const FormularioCategoria = ({ categoria, onSave }) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    codigo: categoria.codigo || 0,
    nome: categoria.nome || "",
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      onSave(formData);
    }
    setValidated(true);
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ Height: "50vh" }} // full screen height
    >
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "60%" }}
      >
        <Row className="mb-4">
          <Form.Group as={Col} controlId="codigo">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="number"
              name="codigo"
              value={formData.codigo}
              readOnly
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Digite o nome da categoria"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              O nome da categoria é obrigatório.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className="form-group text-center mt-3">
          <Button type="submit" className="btn btn-success">
            Salvar <i className="bi bi-save"></i>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormularioCategoria;
