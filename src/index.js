import React from "react";
import ReactDOM from "react-dom";

import {
  ShopProvider,
  CollectionProvider,
  useMeta,
  useCart,
  useProduct,
  useCollection
} from "./shop";

import {
  Container,
  Row,
  Column,
  SectionHeader,
  ProductTitle,
  Price,
  Label,
  Button,
  Card,
  Form,
  TextInput
} from "./atoms";

import "./styles.css";
// A cool thing to add here would be to generate the widgets
// from fields provided by useCollection doing graphql introspection.
const ShopSearchWidgets = () => {
  const shop = useMeta();
  const { dispatch } = useCollection();
  return (
    <div>
      <SectionHeader>{`${shop.title} Widget`}</SectionHeader>
      <Card>
        <Form>
          <Label>Title Contains (Case sensitive Sample Filter Widget)</Label>
          <TextInput
            onChange={e =>
              dispatch({
                type: "FILTER",
                payload: { field: "title", value: e.target.value }
              })
            }
          />
        </Form>
      </Card>
    </div>
  );
};

const ProductSlice = ({ title, id }) => {
  const { setProduct } = useProduct();
  const { add } = useCart();
  return (
    <Card>
      <ProductTitle>{title}</ProductTitle>
      <Button onClick={() => setProduct(id)}>See Details</Button>
      <Button onClick={() => add({ id, title })}>+</Button>
    </Card>
  );
};

const ShopCollection = () => {
  const shop = useMeta();
  const { filteredResults } = useCollection();
  return (
    <div>
      <SectionHeader>{`${shop.title} Collection`}</SectionHeader>
      {filteredResults.map(product => (
        <ProductSlice key={product.id} id={product.id} title={product.title} />
      ))}
    </div>
  );
};

const ProductDetail = () => {
  const shop = useMeta();
  const {
    currentProduct: { id, price, title }
  } = useProduct();
  const { add } = useCart();
  return id ? (
    <Card>
      <SectionHeader>{`${shop.title} Detail`}</SectionHeader>
      <span>
        <ProductTitle key={id}>{title}</ProductTitle>
        <Price>{`$${price}`}</Price>
        <Button onClick={() => add({ id, title })}>+</Button>
      </span>
    </Card>
  ) : null;
};

const Cart = () => {
  const shop = useMeta();
  const { cart, remove } = useCart();
  return (
    <div>
      <SectionHeader>{`${shop.title} Cart`}</SectionHeader>
      {cart.map(product => (
        <Card key={product.cartId}>
          <ProductTitle>{product.title}</ProductTitle>
          <Button onClick={() => remove(product.cartId)}>-</Button>
        </Card>
      ))}
    </div>
  );
};
// Explore ways to create zero unneeded renders with this provider and
// consumer hooks pattern.
// One idea: by splitting up shop context for more targeted consumers.
// Currently every widget relies on shop context. Remove cart state from there.
function App() {
  return (
    <Container>
      <CollectionProvider>
        <Row>
          <Column>
            <ShopSearchWidgets />
          </Column>
          <Column>
            <ShopCollection />
          </Column>
        </Row>
      </CollectionProvider>
      <Row>
        <Column>
          <ProductDetail />
        </Column>
      </Row>
      <Row>
        <Column>
          <Cart />
        </Column>
      </Row>
    </Container>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ShopProvider config={{ api: "/mockApi/", title: "Bobs Burgers" }}>
    <App />
  </ShopProvider>,
  rootElement
);
