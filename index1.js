let ParentContainerEl = document.getElementById("ParentContainer");


const options = {
    method: "GET"
  };
  const getResponse = async()=>{
    const response = await fetch("https://gorest.co.in/public-api/users", options);
    console.log(response)
    const data = await response.json();
    const updatedData =  data.data;
    console.log(updatedData)
    const emailDetails = updatedData.map(each=>{
        let headingEl = document.createElement("h1");
        headingEl.textContent = `${each.name}`;
        ParentContainerEl.appendChild(headingEl);
    })

    return emailDetails;
  }

  getResponse();
