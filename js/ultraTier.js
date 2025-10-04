/*
========================================================================
		                     Ultra Tier List
========================================================================
Version: 1.1

Author: Bobby Jones (https://github.com/bobbyjones)

Attribution / Special Thanks:
------------------------------
1) SortableJS (https://github.com/SortableJS/Sortable)
2) Icomoon App (https://icomoon.io/)

------------------------------------------------------------------------
License
------------------------------------------------------------------------
This software is released under the 3-Clause BSD License:

Copyright: 2025 - Bobby Jones

Redistribution and use in source and binary forms, with or without 
modification, are permitted provided that the following conditions are 
met:

1. Redistributions of source code must retain the above copyright notice, 
this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright 
notice, this list of conditions and the following disclaimer in the 
documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its 
contributors may be used to endorse or promote products derived from 
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 
“AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT 
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A 
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT 
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED 
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR 
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS 
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

/* ============================ Global Variables ======================= */

const tierNameBg = ['red','orange','yellow','green','blue','purple','pink'];
const initialTierNames = ['S','A','B','C','D','E','F'];
let imageSize = 'imgSizeSmall';
let imgConSize = 'imgConSmall';
let poolSize = 'poolSmall';
let poolLocation = 'top';
let countChecked = true;
let labelChecked = false;
let labelNameChecked = false;
let unsaved = false;
let imageMargin = 'imgMarginYes';
let containPadding = 'rowPaddingYes';
let dndGroupName = 'dndGroup';
let tierNameContainer;

/* =================================== Create Row ======================= */

function createRow(argTierName, tierBgColor, tierFontSize) {
  const rowContainer = document.createElement('div');
  const tierName = document.createElement('div');
  const tierNameWrap = document.createElement('span');
  const changeBgButton = document.createElement('button');
  const imageContainer = document.createElement('ol');
  const rowButtons = document.createElement('div');
  const addAboveButton = document.createElement('button');
  const addDeleteButton = document.createElement('button');
  const addBelowButton = document.createElement('button');
  
  tierNameWrap.textContent = argTierName;
  tierNameWrap.classList.add('tierNameWrap');
  
  tierName.classList.add('tierName');
  tierName.setAttribute('onclick','changeTierName(this), fontSizing(this)');
  tierName.classList.add(tierBgColor);
  tierName.classList.add(tierFontSize);
  tierName.appendChild(tierNameWrap);
  
  changeBgButton.setAttribute('onclick','tierBgDialog.showModal(), event.stopPropagation(), tierNameBgSelect(this)');
  
  
  changeBgButton.classList.add('tierBgButton');
  changeBgButton.classList.add('icon-colours');
  changeBgButton.setAttribute('title', "Change Tier Color");
  
  tierName.appendChild(changeBgButton);
  
  imageContainer.classList.add('imageContainer');
  imageContainer.classList.add('dragContainer');
  imageContainer.classList.add(imgConSize);
  imageContainer.classList.add(containPadding);
  imageContainer.textContent = ' ';
  
  addAboveButton.classList.add('addAboveButton');
  addAboveButton.classList.add('icon-circle-up');
  addDeleteButton.classList.add('deleteButton');
  addDeleteButton.classList.add('icon-bin');
  addBelowButton.classList.add('addBelowButton');
  addBelowButton.classList.add('icon-circle-down');
  
  addAboveButton.setAttribute('title','Add Row Above');
  addDeleteButton.setAttribute('title','Delete Row');
  addBelowButton.setAttribute('title','Add Row Below');
  addAboveButton.setAttribute('onclick','addRowAbove(this)');
  addDeleteButton.setAttribute('onclick','deleteRow(this)');
  addBelowButton.setAttribute('onclick','addRowBelow(this)');

  rowButtons.classList.add('rowButtons');
  rowButtons.appendChild(addAboveButton);
  rowButtons.appendChild(addDeleteButton);
  rowButtons.appendChild(addBelowButton);
  
  rowContainer.classList.add('row');
  rowContainer.appendChild(tierName);
  rowContainer.appendChild(imageContainer);
  rowContainer.appendChild(rowButtons);
  
  const sortableInstance = new Sortable(imageContainer, {
	  group: dndGroupName,
	  animation: 150
  }); 

  return rowContainer;
}

function addRowAbove(button) {
  let argTierName = "Click Here to Enter Tier Name";
  let tierFontSize = "tierFontLarge";
  let row = createRow(argTierName, null, tierFontSize);
  let parentDiv = button.parentNode.parentNode;
  let container = document.getElementById('main');
  container.insertBefore(row, parentDiv);
  createTierColors();
  unsaved = true;
}

function addRowBelow(button) {
  let argTierName = "Click Here to Enter Tier Name";
  let tierFontSize = "tierFontLarge";
  let row = createRow(argTierName, null, tierFontSize);
  let parentDiv = button.parentNode.parentNode;
  let container = document.getElementById('main');
  container.insertBefore(row, parentDiv.nextSibling);
  createTierColors();
  unsaved = true;
}

function deleteRow(button) {
  if (confirm("Delete this row and return all its contents back to the image pool?") == true) {
	  const parent = button.parentNode;
	  const previousSibling = parent.previousElementSibling;
		
	  const placeRowContent =  document.querySelector('.imagePool');
	  if(previousSibling && placeRowContent){
		  // Move all child nodes from source to target
		  while (previousSibling.firstChild) {
			  placeRowContent.appendChild(previousSibling.firstChild);
		  }
	  }
	  else{
		  console.error("Source or Target div not found");
	  }
		
	  const rowCount = document.querySelectorAll('.row').length;
	  if(rowCount > 1){
	  	button.parentNode.parentNode.remove();
		createTierColors();
		unsaved = true;
  	  }
  }
}

/* =========================== Change Tier Title ========================= */
	
	function changeTierTitle(titleDiv) {
      const newTierTitle = prompt('Enter New Tier Title:');
      if (newTierTitle !== null) {
        titleDiv.textContent = newTierTitle;
		unsaved = true;
      }
  }
  

/* =========================== Change Tier Name ========================= */
	
	function changeTierName(tierDiv) {
	  const tierNameWrap = tierDiv.firstElementChild;
      const newTierName = prompt('Enter New Tier Name:');
      if (newTierName !== null) {
        tierNameWrap.textContent = newTierName;
		unsaved = true;
      }
  }
  
/* =========================== Change Font Size for Tier Names ========================= */


function fontSizing(tierName){
	const tier = tierName;
	const textContent = tier.textContent;
	const characterCount = textContent.length;
	
	if(characterCount <= 20){
		tier.classList.remove('tierFontXL', 'tierFontLarge', 'tierFontMedium', 'tierFontSmall');
		tier.classList.add('tierFontXL');
	}else if(characterCount <= 55){
		tier.classList.remove('tierFontXL', 'tierFontLarge', 'tierFontMedium', 'tierFontSmall');
		tier.classList.add('tierFontLarge');
	}else if(characterCount <= 75){
		tier.classList.remove('tierFontXL', 'tierFontLarge', 'tierFontMedium', 'tierFontSmall');
		tier.classList.add('tierFontMedium');
	}else{
		tier.classList.remove('tierFontXL', 'tierFontLarge', 'tierFontMedium', 'tierFontSmall');
		tier.classList.add('tierFontSmall');
	}
}
  
/* ========================= Initialize Rows ============================= */

function newTierList(){
	if (confirm("Create new tier list?  This will remove all images and user created rows.") == true) {
		initializeRows();
	}
	let title = document.getElementById('tierTitle');
	title.textContent = "Enter Tier Title Here";
}

function initializeRows(){
	document.querySelectorAll('.row').forEach(element => {
  		element.remove();
	});
	
	const clearImagePool = document.getElementById('imagePool');
	clearImagePool.innerHTML = '';
	
	
	for (let i = 0; i < initialTierNames.length; ++i) {
		let argTierName = initialTierNames[i];
		let tierBgColor=tierNameBg[i];
		let tierFontSize = "tierFontXL"
		let row = createRow(argTierName, tierBgColor, tierFontSize);
		let container = document.getElementById('main');
		container.append(row);
	}
}
window.onload = initializeRows();

/* ============================= Tier Name BG Colors =================== */

function createTierColors(){
	const tierNameList = document.getElementsByClassName("tierName");
	const userBgSet = 'userBgSet';
  	for (let i = 0; i < tierNameList.length; i++) {
		if (!tierNameList[i].classList.contains(userBgSet)) {
			tierNameList[i].classList.remove('red','orange','yellow','green','blue','purple','pink', 'null');
			tierNameList[i].classList.add(tierNameBg[i % tierNameBg.length]);
		}
  	}
}

/* ============================ Save Tier List ========================= */

async function saveTierList() {
  const divContent = document.getElementById('mainWrap').innerHTML;
  const blob = new Blob([divContent], { type: 'text/html' });

  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: 'Tier_List-1.html',
      types: [{
        description: 'HTML Files',
        accept: { 'text/html': ['.html'] },
      }],
    });

    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
  } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error saving file:', error);
      }
  }
  unsaved = false;
}

/* ============================ Load Tier List ========================== */



document.getElementById('loadTier').addEventListener('change', function(event) {
	
	// set sortableJS group to null to prevent multiple instances of the same dnd group, which can cause erratic behavior.
	let dragContainer = document.querySelectorAll(".dragContainer");
	dragContainer.forEach(el => {
		new Sortable(el, {
			group: null,
			animation: 150
		});
	});
	
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function(e) {
			document.getElementById('mainWrap').innerHTML = e.target.result;
				
			let dragContainer = document.querySelectorAll(".dragContainer");	
			if (dragContainer.length > 0) {
				dragContainer.forEach(el => {
					new Sortable(el, {
						group: dndGroupName,
						animation: 150
					});
				});
			}
		};
		reader.readAsText(file);
		file.value = null;
		reader.value = null;
		setTimeout(loadSettings, 800);
	}
	
	
	unsaved = false;
	
	
	
});

function loadSettings(){
	const main = document.getElementById('main'); 
		
	// ---------- Image Count --------------
	
	if(main.classList.contains('loadCountOn')){
		document.getElementById("count-toggle").checked = true;
	}else if(main.classList.contains('loadCountOff')){
		document.getElementById("count-toggle").checked = false;
	}
	
	// ---------- Image Label -------------
	
	if(main.classList.contains('loadLabelOn')){
		document.getElementById("labelToggle").checked = true;
		toggleLabel();
	}else if(main.classList.contains('loadLabelOff')){
		document.getElementById("labelToggle").checked = false;
		toggleLabel();
	}
	
	// ----------- File Name ---------------
	
	if(main.classList.contains('loadFileNameOn')){
		document.getElementById("labelNameToggle").checked = true;
		toggleLabelName();
	}else if(main.classList.contains('loadFileNameOff')){
		document.getElementById("labelNameToggle").checked = false;
		toggleLabelName();
	}
	
	// ---------- Pool Location ----------
	
	if(main.classList.contains('loadPoolTop')){
		document.getElementById('poolTop').checked = true;
		imagePoolLocation();
	}else if(main.classList.contains('loadPoolBottom')){
		document.getElementById('poolBottom').checked = true;
		imagePoolLocation();
	}else if(main.classList.contains('loadPoolLeft')){
		document.getElementById('poolLeft').checked = true;
		imagePoolLocation();
	}else if(main.classList.contains('loadPoolRight')){
		document.getElementById('poolRight').checked = true;
		imagePoolLocation();
	}else if(main.classList.contains('loadPoolHide')){
		document.getElementById('poolHide').checked = true;
		imagePoolLocation();
	}
	
	// --------- Margins --------------
	
	if(main.classList.contains('loadImgMarginYes')){
		document.getElementById('imageMarginYes').checked = true;
	}else if(main.classList.contains('loadImgMarginNo')){
		document.getElementById('imageMarginNo').checked = true;
	}
	
		// -------------- Image Size ----------
	
	if(main.classList.contains('loadImgSmall')){
		
		document.getElementById('imgSizeSmall').checked = true;
		adjustImageSize();
	}else if(main.classList.contains('loadImgXS')){
		
		document.getElementById('imgSizeXS').checked = true;
		adjustImageSize();
	}else if(main.classList.contains('loadImgMed')){
		
		document.getElementById('imgSizeMedium').checked = true;
		adjustImageSize();
	}else if(main.classList.contains('loadImgLrg')){
		
		document.getElementById('imgSizeLarge').checked = true;
		adjustImageSize();
	}else if(main.classList.contains('loadImgXL')){
		
		document.getElementById('imgSizeXL').checked = true;
		adjustImageSize();
	}
	
	
		
}

/* ============================ Import Images =========================== */

function importImages() {
  const imagePool = document.querySelector("#imagePool");
  const files = document.querySelector("#importImgButton").files;

  function parseImageFile(file) {
    // Make sure `file.name` matches our extensions criteria
    if (/\.(?:jpe?g|png|gif)$/i.test(file.name)) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
		  let imgWrap = document.createElement('li');
		  let imageHover = document.createElement('div');
		  let imageDeleteButton = document.createElement('button');
          let image = new Image();
		  let imageLabel = document.createElement('div');
		  let imageLabelVisible = document.createElement('div');
		  let imageLabelHidden = document.createElement('div');
		  let filename = file.name;
		  let fileLabel = filename.replace(/\.[^/.]+$/, '');

		  imageDeleteButton.setAttribute('onclick','imageDelete(this)');
		  imageDeleteButton.classList.add('imageDeleteButton');
		  imageDeleteButton.classList.add('icon-bin');
		  
		  imgWrap.classList.add('draggable');
		  imgWrap.setAttribute('draggable','true');
		  imgWrap.classList.add(imageMargin);
		  
		  imageHover.classList.add('imageHover');
		  
		  imageLabel.classList.add('imageLabel');
		  imageLabel.setAttribute('onclick','changeImageLabel(this)');
		  
		  imageLabelVisible.classList.add('visibleLabel');
		  imageLabelHidden.classList.add('hiddenLabel');
		  imageLabelHidden.textContent = 'Click here to add or change label';
		  
		  if (labelNameChecked == true){
			  imageLabelVisible.textContent = fileLabel;
		  }else{
			  imageLabelVisible.textContent = 'Click here to add or change label';
		  }
		  
		  toggleCount();
		  
		  if (countChecked == true) {
			imgWrap.classList.remove('hide-pseudo');
			} else {
			imgWrap.classList.add('hide-pseudo');
			}
		  
		  if (labelChecked == true) {
			imageLabel.classList.remove('imageLabelHide');
			} else {
			imageLabel.classList.add('imageLabelHide');
			}
		  
		  image.classList.add('image_thumbnail');
		  image.classList.add(imageSize);
          image.src = reader.result;
		  image.alt = file.name;
		  
		  imageLabel.appendChild(imageLabelHidden);
		  imageLabel.appendChild(imageLabelVisible);
		  imageHover.appendChild(image);
		  imageHover.appendChild(imageLabel);
		  imgWrap.appendChild(imageHover);
		  imgWrap.appendChild(imageDeleteButton);
		  imagePool.appendChild(imgWrap);
		  
		  
		  
		  
		  setTimeout(labelWidthSet, 300, image, imageLabel);
		  
		  picker.value = null;
		  unsaved = true;
		  sortImagePool();
		  
		  
		  
        },
        false,
      );
      reader.readAsDataURL(file);
	  
    }
  }

  if (files) {
    Array.prototype.forEach.call(files, parseImageFile);
	
  }
  
}

const picker = document.querySelector("#importImgButton");
picker.addEventListener("change", importImages);

function sortImagePool(){
	const list = document.getElementById("imagePool");
    const listItems = Array.from(list.children); // Convert HTMLCollection to array

    listItems.sort((a, b) => {
		const altA = a.querySelector("img").alt.toLowerCase(); // Get alt text and convert to lowercase
		const altB = b.querySelector("img").alt.toLowerCase(); // Get alt text and convert to lowercase
	
		if (altA < altB) {
		  return -1;
		}
		if (altA > altB) {
		  return 1;
		}
		return 0; // Alt texts are equal
    });

    // Reappend the sorted list items
    listItems.forEach((item) => list.appendChild(item));

}


/* ============================= Image Spacing ========================= */


function imageSpacing(){
	const imageSpacingRadio = document.querySelector('input[name="imageSpacingName"]:checked');
	const images = document.querySelectorAll('.draggable');
	const container = document.querySelectorAll('.imageContainer');
	const imagePool = document.getElementById('imagePool');
	const main = document.getElementById('main');
	let poolPadding  = 'rowPaddingYes';
	
	if (imageSpacingRadio) 
	{
			if (imageSpacingRadio.value === 'imageMarginYes') 
			{
				imageMargin = 'imgMarginYes';
				containPadding = 'rowPaddingYes';
				poolPadding  = 'rowPaddingYes';
				main.classList.remove('loadImgMarginYes', 'loadImgMarginNo');
				main.classList.add('loadImgMarginYes');
				
			} else if (imageSpacingRadio.value === 'imageMarginNo') 
			{
				imageMargin = 'imgMarginNo';
				containPadding = 'rowPaddingNo';
				poolPadding  = 'rowPaddingNoPool';
				main.classList.remove('loadImgMarginYes', 'loadImgMarginNo');
				main.classList.add('loadImgMarginNo');
			}
	}
	
	images.forEach(images => {
		if (imageSpacingRadio) 
		{
				images.classList.remove('imgMarginYes', 'imgMarginNo');
				images.classList.add(imageMargin);
		}
	});
	
	container.forEach(container => {
		if (imageSpacingRadio) 
		{
				container.classList.remove('rowPaddingYes', 'rowPaddingNo');
				container.classList.add(containPadding);
		}
	});
	
	if (imageSpacingRadio) 
		{
			imagePool.classList.remove('rowPaddingYes', 'rowPaddingNo', 'rowPaddingNoPool');
			imagePool.classList.add(poolPadding);
		}
	
}


	

window.onload = imageSpacing();

/* ============================= Delete Image ========================== */

function imageDelete(arg){
	arg.parentNode.remove();
	unsaved = true;
}


/* ============================ Image Pool Drag and Drop Initialization =========================== */

new Sortable(document.getElementById('imagePool'), {
	group: dndGroupName, 
	animation: 150
});


/* ================================= Toggle Settings Menu =========================== */


const settingsCheckbox = document.getElementById('settingsMenu');
const settingsNav = document.getElementById('tierSettings');

settingsCheckbox.addEventListener('change', function() {
  if (this.checked) {
    settingsNav.style.display = 'flex'; // Show the element
  } else {
    settingsNav.style.display = 'none';  // Hide the element
  }
});


/* ================================= Image Size Handeling =========================== */


window.onload = adjustImageSize();

function adjustImageSize() {
  const adjustImageSizeRadio = document.querySelector('input[name="adjustImage"]:checked');
  const main = document.getElementById('main');
  
  if (adjustImageSizeRadio) {
    if (adjustImageSizeRadio.value === 'imgSizeSmall') {
		imageSize = 'imgSizeSmall';
		main.classList.remove('loadImgSmall', 'loadImgXS', 'loadImgMed', 'loadImgLrg', 'loadImgXL');
		main.classList.add('loadImgSmall');
		if (labelChecked == true){
			imgConSize = 'imgConSmall-label';
			poolSize = 'poolSmall-label';
		}else{
			imgConSize = 'imgConSmall';
			poolSize = 'poolSmall';
		}
    } else if (adjustImageSizeRadio.value === 'imgSizeXS') {
		imageSize = 'imgSizeXS';
		main.classList.remove('loadImgSmall', 'loadImgXS', 'loadImgMed', 'loadImgLrg', 'loadImgXL');
		main.classList.add('loadImgXS');
		if (labelChecked == true){
			imgConSize = 'imgConXS-label';
			poolSize = 'poolXS-label';
		}else{
			imgConSize = 'imgConXS';
			poolSize = 'poolXS';
		}
    }else if (adjustImageSizeRadio.value === 'imgSizeMedium') {
		imageSize = 'imgSizeMedium';
		main.classList.remove('loadImgSmall', 'loadImgXS', 'loadImgMed', 'loadImgLrg', 'loadImgXL');
		main.classList.add('loadImgMed');
		if (labelChecked == true){
			imgConSize = 'imgConMedium-label';
			poolSize = 'poolMedium-label';
		}else{
			imgConSize = 'imgConMedium';
			poolSize = 'poolMedium';
		}
    } else if (adjustImageSizeRadio.value === 'imgSizeLarge') {
		imageSize = 'imgSizeLarge';
		main.classList.remove('loadImgSmall', 'loadImgXS', 'loadImgMed', 'loadImgLrg', 'loadImgXL');
		main.classList.add('loadImgLrg');
		if (labelChecked == true){
			imgConSize = 'imgConLarge-label';
			poolSize = 'poolLarge-label';
		}else{
			imgConSize = 'imgConLarge';
			poolSize = 'poolLarge';
		}
    } else if (adjustImageSizeRadio.value === 'imgSizeXL') {
		imageSize = 'imgSizeXL';
		main.classList.remove('loadImgSmall', 'loadImgXS', 'loadImgMed', 'loadImgLrg', 'loadImgXL');
		main.classList.add('loadImgXL');
		if (labelChecked == true){
			imgConSize = 'imgConXL-label';
			poolSize = 'poolXL-label';
		}else{
			imgConSize = 'imgConXL';
			poolSize = 'poolXL';
		}
    }
  } else {
    console.log('No option selected');
    // Code if no option is selected
  }
  
  let imgWrap = document.querySelectorAll('.image_thumbnail');
  imgWrap.forEach((imgWrap) => {
	  imgWrap.classList.remove('imgSizeXS', 'imgSizeSmall', 'imgSizeMedium', 'imgSizeLarge', 'imgSizeXL');
	  imgWrap.classList.add(imageSize);
  });
  
  let imgConVar = document.querySelectorAll('.imageContainer');
  imgConVar.forEach((imgConVar) => {
	  imgConVar.classList.remove('imgConXS', 'imgConXS-label', 'imgConSmall', 'imgConSmall-label', 'imgConMedium', 'imgConMedium-label', 'imgConLarge', 'imgConLarge-label', 'imgConXL', 'imgConXL-label' );
	  imgConVar.classList.add(imgConSize);
  });
  
  setTimeout(labelWidthSetAfter, 300);
  
  const imagePoolRadio = document.querySelector('input[name="poolLocation"]:checked');
  let imagePool = document.getElementById('imagePool');
  
  if (imagePoolRadio) {
    if (imagePoolRadio.value === 'poolTop') {
	  imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
	  imagePool.classList.add(poolSize);
	} else if (imagePoolRadio.value === 'poolBottom') {
	  imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
	  imagePool.classList.add(poolSize);
	} else if (imagePoolRadio.value === 'poolLeft') {
	  imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
	} else if (imagePoolRadio.value === 'poolRight') {
	  imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
	} else {
    	console.log('No option selected');
    }
  }
}

/* ================================= Toggle Image Count ============================= */


	
function toggleCount(){
	
	const checkbox = document.getElementById('count-toggle');
	const main = document.getElementById('main');

	if (checkbox.checked) {
	  countChecked = true;
	  main.classList.remove('loadCountOn', 'loadCountOff');
	  main.classList.add('loadCountOn');
	} else {
	  countChecked = false;
	  main.classList.remove('loadCountOn', 'loadCountOff');
	  main.classList.add('loadCountOff');
	}
	
	const elements = document.querySelectorAll('.draggable');
	
	checkbox.addEventListener('change', function() {
	  elements.forEach(element => {
		if (this.checked) {
			element.classList.remove('hide-pseudo');
			countChecked = true;
		} else {
			element.classList.add('hide-pseudo');
			countChecked = false;
		}
	  });
	});
}

window.onload = toggleCount();

/* ================================= Toggle Image Label ============================= */


	
function toggleLabel(){
	
	
	const labelCheckbox = document.getElementById('labelToggle');
	const main = document.getElementById('main');

	if (labelCheckbox.checked) {
	  labelChecked = true;
	  main.classList.remove('loadLabelOn', 'loadLabelOff');
	  main.classList.add('loadLabelOn');
	} else {
	  labelChecked = false;
	  main.classList.remove('loadLabelOn', 'loadLabelOff');
	  main.classList.add('loadLabelOff');
	}
	
	const element = document.querySelectorAll('.imageLabel');
	let imgConVar = document.querySelectorAll('.imageContainer');
	let imagePool = document.getElementById('imagePool');
	
	labelCheckbox.addEventListener('change', function() {
		
		if (this.checked) {
			if(poolLocation == 'top' || poolLocation == 'bottom'){
				if(imageSize == 'imgSizeXS'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					imagePool.classList.add('poolXS-label');
					poolSize = 'poolXS-label';
				}else if(imageSize == 'imgSizeSmall'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					imagePool.classList.add('poolSmall-label');
					poolSize = 'poolSmall-label';
				}else if(imageSize == 'imgSizeMedium'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					imagePool.classList.add('poolMedium-label');
					poolSize = 'poolXS-Medium';
				}else if(imageSize == 'imgSizeLarge'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					imagePool.classList.add('poolLarge-label');
					poolSize = 'poolLarge-label';
				}else if(imageSize == 'imgSizeXL'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					imagePool.classList.add('poolXL-label');
					poolSize = 'poolXL-label';
				}
			}else if(poolLocation == 'left' || poolLocation == 'right' || poolLocation == 'hide'){
				if(imageSize == 'imgSizeXS'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					poolSize = 'poolXS-label';
				}else if(imageSize == 'imgSizeSmall'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					poolSize = 'poolSmall-label';
				}else if(imageSize == 'imgSizeMedium'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					poolSize = 'poolMedium-label';
				}else if(imageSize == 'imgSizeLarge'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					poolSize = 'poolLarge-label';
				}else if(imageSize == 'imgSizeXL'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					poolSize = 'poolXL-label';
				}
			}
		}else{
			if(poolLocation == 'top' || poolLocation == 'bottom'){
				if(imageSize == 'imgSizeXS'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					imagePool.classList.add('poolXS');
					poolSize = 'poolXS';
				}else if(imageSize == 'imgSizeSmall'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					imagePool.classList.add('poolSmall');
					poolSize = 'poolSmall';
				}else if(imageSize == 'imgSizeMedium'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					imagePool.classList.add('poolMedium');
					poolSize = 'poolMedium';
				}else if(imageSize == 'imgSizeLarge'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					imagePool.classList.add('poolLarge');
					poolSize = 'poolLarge';
				}else if(imageSize == 'imgSizeXL'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					imagePool.classList.add('poolXL');
					poolSize = 'poolXL';
				}
			}else if(poolLocation == 'left' || poolLocation == 'right' || poolLocation == 'hide'){
				if(imageSize == 'imgSizeXS'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					poolSize = 'poolXS';
				}else if(imageSize == 'imgSizeSmall'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					poolSize = 'poolSmall';
				}else if(imageSize == 'imgSizeMedium'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					poolSize = 'poolMedium';
				}else if(imageSize == 'imgSizeLarge'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					poolSize = 'poolLarge';
				}else if(imageSize == 'imgSizeXL'){
					imagePool.classList.remove('poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
					poolSize = 'poolXL';
				}
			}
		}
		
		
		
		imgConVar.forEach((imgConVar) => {
			if (this.checked) {
				if(imageSize == 'imgSizeXS'){
				  imgConVar.classList.remove('imgConXS', 'imgConXS-label', 'imgConSmall', 'imgConSmall-label', 'imgConMedium', 'imgConMedium-label', 'imgConLarge', 'imgConLarge-label', 'imgConXL', 'imgConXL-label' );
				  imgConVar.classList.add('imgConXS-label');
				}else if(imageSize == 'imgSizeSmall'){
					imgConVar.classList.remove('imgConXS', 'imgConXS-label', 'imgConSmall', 'imgConSmall-label', 'imgConMedium', 'imgConMedium-label', 'imgConLarge', 'imgConLarge-label', 'imgConXL', 'imgConXL-label' );
				    imgConVar.classList.add('imgConSmall-label');
				}else if(imageSize == 'imgSizeMedium'){
					imgConVar.classList.remove('imgConXS', 'imgConXS-label', 'imgConSmall', 'imgConSmall-label', 'imgConMedium', 'imgConMedium-label', 'imgConLarge', 'imgConLarge-label', 'imgConXL', 'imgConXL-label' );
				    imgConVar.classList.add('imgConMedium-label');
				}else if(imageSize == 'imgSizeLarge'){
					imgConVar.classList.remove('imgConXS', 'imgConXS-label', 'imgConSmall', 'imgConSmall-label', 'imgConMedium', 'imgConMedium-label', 'imgConLarge', 'imgConLarge-label', 'imgConXL', 'imgConXL-label' );
				    imgConVar.classList.add('imgConLarge-label');
				}else if(imageSize == 'imgSizeXL'){
					imgConVar.classList.remove('imgConXS', 'imgConXS-label', 'imgConSmall', 'imgConSmall-label', 'imgConMedium', 'imgConMedium-label', 'imgConLarge', 'imgConLarge-label', 'imgConXL', 'imgConXL-label' );
				    imgConVar.classList.add('imgConXL-label');
				}
			}else {
				if(imageSize == 'imgSizeXS'){
				  imgConVar.classList.remove('imgConXS', 'imgConXS-label', 'imgConSmall', 'imgConSmall-label', 'imgConMedium', 'imgConMedium-label', 'imgConLarge', 'imgConLarge-label', 'imgConXL', 'imgConXL-label' );
				  imgConVar.classList.add('imgConXS');
				}else if(imageSize == 'imgSizeSmall'){
					imgConVar.classList.remove('imgConXS', 'imgConXS-label', 'imgConSmall', 'imgConSmall-label', 'imgConMedium', 'imgConMedium-label', 'imgConLarge', 'imgConLarge-label', 'imgConXL', 'imgConXL-label' );
				    imgConVar.classList.add('imgConSmall');
				}else if(imageSize == 'imgSizeMedium'){
					imgConVar.classList.remove('imgConXS', 'imgConXS-label', 'imgConSmall', 'imgConSmall-label', 'imgConMedium', 'imgConMedium-label', 'imgConLarge', 'imgConLarge-label', 'imgConXL', 'imgConXL-label' );
				    imgConVar.classList.add('imgConMedium');
				}else if(imageSize == 'imgSizeLarge'){
					imgConVar.classList.remove('imgConXS', 'imgConXS-label', 'imgConSmall', 'imgConSmall-label', 'imgConMedium', 'imgConMedium-label', 'imgConLarge', 'imgConLarge-label', 'imgConXL', 'imgConXL-label' );
				    imgConVar.classList.add('imgConLarge');
				}else if(imageSize == 'imgSizeXL'){
					imgConVar.classList.remove('imgConXS', 'imgConXS-label', 'imgConSmall', 'imgConSmall-label', 'imgConMedium', 'imgConMedium-label', 'imgConLarge', 'imgConLarge-label', 'imgConXL', 'imgConXL-label' );
				    imgConVar.classList.add('imgConXL');
				}
			}
		});
		
		element.forEach(element => {
			if (this.checked) {
				element.classList.remove('imageLabelHide');
				labelChecked = true;
				
			} else {
				element.classList.add('imageLabelHide');
				labelChecked = false;
			}
	  });
	});
	
	
	
	
	
}

/* ================================= Toggle Label Name ============================= */

function toggleLabelName(){
	
	const labelNameCheckbox = document.getElementById('labelNameToggle');
	const main = document.getElementById('main');

	if (labelNameCheckbox.checked) {
	  labelNameChecked = true;
	  main.classList.remove('loadFileNameOn', 'loadFileNameOff');
	  main.classList.add('loadFileNameOn');
	} else {
	  labelNameChecked = false;
	  main.classList.remove('loadFileNameOn', 'loadFileNameOff');
	  main.classList.add('loadFileNameOff');
	}
}


/* ================================= Image Pool Location ============================ */

window.onload = imagePoolLocation();

function imagePoolLocation(){

	const imagePoolRadio = document.querySelector('input[name="poolLocation"]:checked');
	const mainWrap = document.getElementById('mainWrap');
	let imagePool = document.getElementById('imagePool');
	const main = document.getElementById('main');
	
  if (imagePoolRadio) {
    if (imagePoolRadio.value === 'poolTop') {
		poolLocation = 'top';
		
		imagePool.classList.remove('imagePoolTop', 'imagePoolBottom', 'imagePoolLeft', 'imagePoolRight', 'imagePoolHide', 'poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
		imagePool.classList.add('imagePoolTop', poolSize);
		
		mainWrap.classList.remove('mainWrapBottom', 'mainWrapLeft', 'mainWrapRight', 'mainWrapTop');
		mainWrap.classList.add('mainWrapTop');
		
		main.classList.remove('loadPoolTop', 'loadPoolBottom', 'loadPoolLeft', 'loadPoolRight', 'loadPoolHide');
	  	main.classList.add('loadPoolTop');
		
    } else if (imagePoolRadio.value === 'poolBottom') {
		poolLocation = 'bottom';
		
		imagePool.classList.remove('imagePoolTop', 'imagePoolBottom', 'imagePoolLeft', 'imagePoolRight', 'imagePoolHide', 'poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
		imagePool.classList.add("imagePoolBottom", poolSize);		
		
		mainWrap.classList.remove('mainWrapBottom', 'mainWrapLeft', 'mainWrapRight', 'mainWrapTop');
		mainWrap.classList.add('mainWrapBottom');
		
		main.classList.remove('loadPoolTop', 'loadPoolBottom', 'loadPoolLeft', 'loadPoolRight', 'loadPoolHide');
	  	main.classList.add('loadPoolBottom');
		
    } else if (imagePoolRadio.value === 'poolLeft') {	
		poolLocation='left'
	
		imagePool.classList.remove('imagePoolTop', 'imagePoolBottom', 'imagePoolLeft', 'imagePoolRight', 'imagePoolHide', 'poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
		imagePool.classList.add("imagePoolLeft");
		
		mainWrap.classList.remove('mainWrapBottom', 'mainWrapLeft', 'mainWrapRight', 'mainWrapTop');
		mainWrap.classList.add('mainWrapLeft');
		
		main.classList.remove('loadPoolTop', 'loadPoolBottom', 'loadPoolLeft', 'loadPoolRight', 'loadPoolHide');
	  	main.classList.add('loadPoolLeft');
		
    } else if (imagePoolRadio.value === 'poolRight') {
		poolLocation = 'right';
		
		imagePool.classList.remove('imagePoolTop', 'imagePoolBottom', 'imagePoolLeft', 'imagePoolRight', 'imagePoolHide', 'poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
		imagePool.classList.add("imagePoolRight");
		
		mainWrap.classList.remove('mainWrapBottom', 'mainWrapLeft', 'mainWrapRight', 'mainWrapTop');
		mainWrap.classList.add('mainWrapRight');
		
		main.classList.remove('loadPoolTop', 'loadPoolBottom', 'loadPoolLeft', 'loadPoolRight', 'loadPoolHide');
	  	main.classList.add('loadPoolRight');
		
    }else if (imagePoolRadio.value === 'poolHide') {
		poolLocation = 'hide';
		
		imagePool.classList.remove('imagePoolTop', 'imagePoolBottom', 'imagePoolLeft', 'imagePoolRight', 'imagePoolHide', 'poolXS', 'poolXS-label', 'poolSmall', 'poolSmall-label', 'poolMedium', 'poolMedium-label', 'poolLarge', 'poolLarge-label', 'poolXL', 'poolXL-label');
		imagePool.classList.add("imagePoolHide");
		
		mainWrap.classList.remove('mainWrapBottom', 'mainWrapLeft', 'mainWrapRight', 'mainWrapTop');
		mainWrap.classList.add('mainWrapTop');
		
		main.classList.remove('loadPoolTop', 'loadPoolBottom', 'loadPoolLeft', 'loadPoolRight', 'loadPoolHide');
	  	main.classList.add('loadPoolHide');
		
    }
    else {
    	console.log('No option selected');
    }
  }  
}

/* ========================== Check for unsaved changes ======================= */

	window.addEventListener('beforeunload', (evt) => {
		if (!unsaved) return null;
		let closeMessage = "There are unsaved changes. Leave anyway?";
		(evt || window.event).returnValue = closeMessage;
		return closeMessage;
	});

/* ========================== Image Label changes ======================= */

	function changeImageLabel(imageLabel) {
	  const visibleLabel = imageLabel.querySelector('.visibleLabel'); 
      const newImageLabel = prompt('Enter Image Label:');
	  
      if (newImageLabel !== null) {
        visibleLabel.textContent = newImageLabel;
		unsaved = true;
      }
  }

  function labelWidthSet(image, imageLabel){
	let labelWidth = image.offsetWidth;
	imageLabel.style.width = labelWidth + 'px';
  }
  
  
   function labelWidthSetAfter(){
	   let images = document.querySelectorAll('.image_thumbnail');
	   let imageLabel = document.querySelectorAll('.imageLabel');
	   
	  imageLabel.forEach((imageLabel, idx) => {
		  let labelWidth = images[idx].offsetWidth;
		  imageLabel.style.width = labelWidth + 'px';
	  });
   }
   
   /* =========================== Tier Name BG Color Select ================ */
   
   function tierNameBgSelect(tierBgButton){
	   tierNameContainer = tierBgButton.parentNode;	   
	   tierNameBgReset();
   }
   
   function tierBg(){
	   
	   const tierBGRadio = document.querySelector('input[name="tierBG"]:checked');
	   
	   if (tierBGRadio) {
          if (tierBGRadio.value === 'red') {
			  tierNameContainer.classList.remove('red','orange','yellow','green','blue','purple','pink');
			  tierNameContainer.classList.add('red', 'userBgSet');
		  }else if (tierBGRadio.value === 'orange') {
			  tierNameContainer.classList.remove('red','orange','yellow','green','blue','purple','pink');
			  tierNameContainer.classList.add('orange', 'userBgSet');
		  }else if (tierBGRadio.value === 'yellow') {
			  tierNameContainer.classList.remove('red','orange','yellow','green','blue','purple','pink');
			  tierNameContainer.classList.add('yellow', 'userBgSet');
		  }else if (tierBGRadio.value === 'green') {
			  tierNameContainer.classList.remove('red','orange','yellow','green','blue','purple','pink');
			  tierNameContainer.classList.add('green', 'userBgSet');
		  }else if (tierBGRadio.value === 'blue') {
			  tierNameContainer.classList.remove('red','orange','yellow','green','blue','purple','pink');
			  tierNameContainer.classList.add('blue', 'userBgSet');
		  }else if (tierBGRadio.value === 'purple') {
			  tierNameContainer.classList.remove('red','orange','yellow','green','blue','purple','pink');
			  tierNameContainer.classList.add('purple', 'userBgSet');
		  }else if (tierBGRadio.value === 'pink') {
			  tierNameContainer.classList.remove('red','orange','yellow','green','blue','purple','pink');
			  tierNameContainer.classList.add('pink', 'userBgSet');
		  }
	   }
   }
   
      function tierNameBgReset(){
	   
	   const red = 'red';
	   const orange = 'orange';
	   const yellow = 'yellow';
	   const green = 'green';
	   const blue = 'blue';
	   const purple = 'purple';
	   const pink = 'pink';
	   
	   if (tierNameContainer.classList.contains(red)){
		   const redButton = document.getElementById('red');
		   redButton.checked = true;
	   }else if (tierNameContainer.classList.contains(orange)){
		   const orangeButton = document.getElementById('orange');
		   orangeButton.checked = true;
	   }else if (tierNameContainer.classList.contains(yellow)){
		   const yellowButton = document.getElementById('yellow');
		   yellowButton.checked = true;
	   }else if (tierNameContainer.classList.contains(green)){
		   const greenButton = document.getElementById('green');
		   greenButton.checked = true;
	   }else if (tierNameContainer.classList.contains(blue)){
		   const blueButton = document.getElementById('blue');
		   blueButton.checked = true;
	   }else if (tierNameContainer.classList.contains(purple)){
		   const purpleButton = document.getElementById('purple');
		   purpleButton.checked = true;
	   }else if (tierNameContainer.classList.contains(pink)){
		   const pinkButton = document.getElementById('pink');
		   pinkButton.checked = true;
	   }
   }
   
   function resetBg(){
	   tierNameContainer.classList.remove('userBgSet');
	   createTierColors();
	   setTimeout(tierNameBgReset, 100);
   }
   
   /* ========================= Screenshot ========================== */
   
   function screenshot(){
	   
	   const capture = document.getElementById('main');
	   
	   if (capture) {
            html2canvas(capture).then(canvas => {
                // Append the canvas to the body (optional, for display)
                //document.body.appendChild(canvas);

                // To download the image:
                const link = document.createElement('a');
                link.download = 'UltraTierList.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        } else {
            console.error("Element to capture not found.");
        }
   }