const Details = ({ user }) => {
  console.log(user);
  return (
    <div>
      <h2> {user.email} </h2>
      <p>
        {" "}
        <strong>Name:</strong>
        {user.name}
      </p>
      <p>
        <strong>Username :</strong> {user.username}
      </p>
      <p>
        {" "}
        <strong>Phone :</strong> {user.phone}
      </p>
      <p>
        {" "}
        <strong>City :</strong> {user.address.city} {user.address.street}
      </p>
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  const paths = users.map((user) => {
    return {
      params: { id: user.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json();
  return {
    props: {
      user,
    },
  };
};

export default Details;
