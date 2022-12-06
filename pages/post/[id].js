import Layout from "../../components/layout";

export default function Post({postData}) {
  return (
    <Layout>
      <h1>{postData.title}</h1>
      <p>{postData.body}</p>
    </Layout>
  );
}

async function getAllPostId() {
  const apiUrl = "http://localhost:3001/post";
  const response = await fetch(apiUrl);
  const allPost = await response.json();

  const allPostId = allPost.map((post) => {
    return { params: { id: post.alias } };
  });

  return allPostId;
}

//getStaticPath
export async function getStaticPaths() {
  const paths = await getAllPostId();
  return {
    paths,
    fallback: false,
  };
}

// mendapatkan data tunggal dari post dengan parameter alias

async function getPostData(id) {
  const apiURL = `http://localhost:3001/post?alias=${id}`;
  const response = await fetch(apiURL);
  const postData = await response.json();

  return postData;
}

// getStaticProps

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData: postData[0],
    },
  };
}
