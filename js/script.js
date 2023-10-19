
document.addEventListener('DOMContentLoaded', function () {
	let sqFtInputEl = document.getElementById('sq-ft-input')


	function hideCartonTxtSummaryPlaceholder(hide){
		if(hide){
			document.getElementById('cartons-summary-text-placeholder').classList.add('d-none')
		}else{
			document.getElementById('cartons-summary-text-placeholder').classList.remove('d-none')
		}
		
	}
	function hideCartonTxtSummary(hide) {
		if (hide) {
			document.getElementById('cartons-summary-text').classList.add('d-none')
		} else {
			document.getElementById('cartons-summary-text').classList.remove('d-none')
		}

	}

	function getSqFtPerBox() {
		const sqFtPerBoxInputEl = document.getElementById('sq-ft-per-box-input')
		return sqFtPerBoxInputEl.value

	}

	function getProductPrice(){
		return document.getElementById('product-price').value
	}

	function setValueOfCartonInput() {
		const cartonInputEl = document.getElementById('carton-input')
		console.log(cartonInputEl.value)
	}

	function getNumberOfSqFt(){
		return document.getElementById('sq-ft-input').value
	}

	function calculateNumberOfBoxesRequired(numberOfTiles) {
		console.log(numberOfTiles)
		const sqFtPerBox = parseFloat(getSqFtPerBox())
		const sqFtInputValue = parseInt(getNumberOfSqFt())
		return (Math.ceil(sqFtInputValue/sqFtPerBox))
	}

	sqFtInputEl.addEventListener('input', function () {
		console.log("Running")
		hideCartonTxtSummaryPlaceholder(true)
		hideCartonTxtSummary(false)
		calculateNumberOfBoxesRequired()


	})


})
