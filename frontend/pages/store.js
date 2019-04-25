import Link from "next/link";
import Footer from "../components/Footer";
import fetch from "isomorphic-unfetch";

function Store(props) {
  console.log("got props", props);
  const { products } = props;

  return (
    <div>
      <article className="pt5 bg-black white ph3">
        <a className="link white tc">
          <p>
            <i className="material-icons md-48 v-top">store</i>
          </p>
          <h1 className="tc f3 mb4">Model Store</h1>
        </a>
        <h2 className="f4 fw4 pa3 mv0 tc">
          <i className="material-icons red">whatshot</i>
        </h2>
        <div className="cf pa2">
          {// how about adding some placeholders here
          Array.isArray(products) &&
            products.map(product => (
              <div className="fl w-100 w-50-m w-25-l pa2" key={product.id}>
                <Link
                  href={`/edit?id=${product.id}&name=${
                    product.name
                  }&description=${product.description}&price=${
                    product.price
                  }&url=${product.url}`}
                >
                  <a className="db link dim tc white">
                    <img
                      src={`/static/models/${product.id}/thumbnail@m.jpg`}
                      alt="Lorem"
                      className="w-100 db outline black-10"
                    />
                    <dl className="mt2 f6 lh-copy">
                      <dt className="clip">Name</dt>
                      <dd className="ml0 white truncate w-100">
                        {product.name}
                      </dd>
                      <dt className="clip">Description</dt>
                      <dd className="ml0 gray truncate w-100">
                        {product.description}
                      </dd>
                    </dl>
                  </a>
                </Link>
              </div>
            ))}
        </div>
      </article>
      <Footer />
    </div>
  );
}

Store.getInitialProps = async ({ req }) => {
  let URL;

  if (typeof window === "undefined") {
    URL = `https://${req.headers.host}/api/get-products`;
  } else {
    URL = "/api/get-products";
  }

  const props = { products: [] };

  try {
    const response = await fetch(URL);
    const { docs } = await response.json();
    props.products = docs;
  } catch (e) {
    console.error(e.message);
  }
  return props;
};

export default Store;
