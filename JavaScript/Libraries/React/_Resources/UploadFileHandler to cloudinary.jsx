uploadFile = async e => {
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", "sickfits");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/oh-my/image/upload",
    {
      method: "POST",
      body: data
    }
  );
  const file = await res.json();
  console.log(file);

  this.setState({
    image: file.secure_url,
    largeImage: file.eager[0].secure_url
  });
};
