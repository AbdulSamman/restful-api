import { ObjectId } from "mongodb";

export const getPosts = async (req, res) => {
  try {
    const postsDb = req.app.locals.db;
    const postsCo = postsDb.collection("posts");

    const { title, name } = req.query;

    if (!title && !name) {
      if (Object.keys(req.query).toString().length > 0) {
        res.status(500).json("results are not found");
      } else {
        const getPost = await postsCo.find({}).toArray();

        res.json(getPost);
      }
    } else if (title) {
      const getTitle = await postsCo
        .find({
          ...req.query,
          title: { $regex: `${title}`, $options: "i" },
        })
        .toArray();
      if (getTitle.length == 0) {
        res.status(500).json("title not found");
      } else {
        res.json(getTitle);
      }
    } else if (name) {
      const getName = await postsCo
        .find({ ...req.query, name: { $regex: `${name}`, $options: "i" } })
        .toArray();
      if (getName.length == 0) {
        res.status(500).json("name not found");
      } else {
        res.json(getName);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const postsDb = req.app.locals.db;
    const postsCo = postsDb.collection("posts");
    const getPost = await postsCo.findOne({ _id: new ObjectId(req.params.id) });
    if (getPost) {
      res.json(getPost);
    } else {
      res.status(500).json({ message: "No result found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addPost = async (req, res) => {
  try {
    const postsDb = req.app.locals.db;
    const postsCo = postsDb.collection("posts");

    const addPost = await postsCo.insertOne(req.body);

    console.log(req.body);
    res.json(addPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePosts = async (req, res) => {
  try {
    const postsDb = req.app.locals.db;
    const postsCo = postsDb.collection("posts");

    const findPost = await postsCo.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body } }
    );

    res.json(findPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePosts = async (req, res) => {
  try {
    const postsDb = req.app.locals.db;
    const postsCo = postsDb.collection("posts");
    const deleteOne = await postsCo.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(deleteOne);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
