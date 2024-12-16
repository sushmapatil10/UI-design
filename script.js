function selectBox(boxNumber, price) {
    // Remove 'active' class and hide all box content
    document.querySelectorAll(".bundle-box").forEach(box => {
      box.classList.remove("active");
      box.querySelector(".box-content").style.display = "none";
    });
  
    // Check the selected box radio button
    document.getElementById(`radio${boxNumber}`).checked = true;
  
    // Add 'active' class to the selected box and display its content
    const selectedBox = document.getElementById(`box${boxNumber}`);
    selectedBox.classList.add("active");
    selectedBox.querySelector(".box-content").style.display = "block";
  
    // Calculate discount based on boxNumber
    let discountPercentage = 0;
    if (boxNumber === 1) discountPercentage = 50;
    else if (boxNumber === 2) discountPercentage = 40;
    else if (boxNumber === 3) discountPercentage = 60;
  
    // Calculate final price after discount
    const discountAmount = (price * discountPercentage) / 100;
    const finalPrice = price - discountAmount;
  
    // Update the total price on UI
    document.getElementById("selected-price").innerText = `Total: DKK ${finalPrice.toFixed(2)} (Discount: ${discountPercentage}%)`;
  
    // Save selection to sessionStorage
    const selectedData = {
      boxNumber: boxNumber,
      price: price,
      discountPercentage: discountPercentage,
      finalPrice: finalPrice.toFixed(2)
    };
    sessionStorage.setItem("selectedBundle", JSON.stringify(selectedData));
  }
  
  // Function for Add to Cart
  function addToCart() {
    // Retrieve the selected bundle data from sessionStorage
    const selectedBundle = sessionStorage.getItem("selectedBundle");
    
    if (selectedBundle) {
      const bundle = JSON.parse(selectedBundle);
      alert(`Added to cart!\nBox ${bundle.boxNumber}: Total DKK ${bundle.finalPrice} (Discount ${bundle.discountPercentage}%)`);
    } else {
      alert("Please select a bundle before adding to the cart!");
    }
  }
  
  // Attach event listener to Add to Cart button
  document.querySelector(".add-to-cart").addEventListener("click", addToCart);
  