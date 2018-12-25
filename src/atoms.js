import styled from "@emotion/styled";

// Layout Styled Components
const Container = styled.div`
  background: #f3f3f3;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex: 1 1 0;
  margin: 10px;
  padding: 10px;
`;
const Button = styled.button`
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  background-color: #e91e63;
  min-width: 40px;
  margin-left: 4px;
  padding: 10px;
`;
const Card = styled.div`
  background: white;
  box-shadow: 0 2px 1px #777;
  border-radius: 6px;
  flex: 1 1 0;
  margin: 10px 5px;
  padding: 10px 10px;
`;
//Section Components
const SectionHeader = styled.h2`
  font-family: "Varela Round", sans-serif;
  margin: 0 0 1ß5px 0;
  padding: 0;
`;

const ProductTitle = styled.h3`
  font-family: "Open Sans", sans-serif;
  margin: 0 0 5px 0;
  padding: 0;
`;

const Price = styled.h3`
  font-family: "Open Sans", sans-serif;
  font-size: 2rem;
  color: #8a488a;
  margin: 0 0 15px 0;
  padding: 0;
`;

//Widget Styled Atoms
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  margin-bottom: 8px;
`;
const TextInput = styled.input`
  border-radius: 4px;
  border: none;
  background-color: #373758;
  color: white;
  font-size: 1rem;
  margin-bottom: 10px;
  padding: 10px;
`;

export {
  Container,
  Row,
  Column,
  Button,
  Card,
  SectionHeader,
  ProductTitle,
  Price,
  Label,
  Form,
  TextInput
};
