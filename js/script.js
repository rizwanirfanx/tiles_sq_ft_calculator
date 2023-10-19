
document.addEventListener('DOMContentLoaded', function () {
	let sqFtInputEl = document.getElementById('sq-ft-input')


	function hideCartonTxtSummaryPlaceholder(hide) {
		if (hide) {
			document.getElementById('cartons-summary-text-placeholder').classList.add('d-none')
		} else {
			document.getElementById('cartons-summary-text-placeholder').classList.remove('d-none')
		}
	}
	function hideTotalPrice(hide) {
		if (hide) {
			document.getElementById('total-price-container').classList.add('d-none')
		} else {
			document.getElementById('total-price-container').classList.remove('d-none')
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



	function getProductPrice() {
		return document.getElementById('tws-product-price').value
	}

	function setValueOfCartonInput(value) {
		const cartonInputEl = document.getElementById('carton-input')
		cartonInputEl.value = value
	}
	function setValueOfCartonInputWithoutReserve(value){
		const cartonWOReserveInputEl = document.getElementById('carton-input-without-reserve')
		cartonWOReserveInputEl.value = value
	}
	function getNumberOfCartonsInputValueWithoutReserve(){
		const cartonWOReserveInputEl = document.getElementById('carton-input-without-reserve')
		return cartonWOReserveInputEl.value
	}
	function setValueOfTotalPrice(value) {
		document.getElementById('tws-total-price').innerHTML = value

	}

	function getNumberOfSqFt() {
		return document.getElementById('sq-ft-input').value
	}

	function calculateNumberOfBoxesRequired(numberOfTiles) {
		const sqFtPerBox = parseFloat(getSqFtPerBox())
		const sqFtInputValue = parseInt(getNumberOfSqFt())
		return (Math.ceil(sqFtInputValue / sqFtPerBox))
	}

	function calculateNumberOfTilesInCarton(numberOfCartons) {
		return (getSqFtPerBox() * numberOfCartons)
	}

	function calculatePrice(numberOfSqFt) {
		const priceEl = document.getElementById('tws-product-price')
		const pricePerSqFt = parseFloat(priceEl.value)
		return pricePerSqFt * numberOfSqFt
	}


	function setValueOfCartonsInPriceSummary(value) {
		document.getElementById('number-of-cartons').innerHTML = value
	}
	function setValueOfSqFtPriceSummary(value) {
		document.getElementById('number-of-sq-ft-in-cartons').innerHTML = value
	}

	function getNumberOfCartonsInputValue() {
		return document.getElementById('carton-input').value
	}




	sqFtInputEl.addEventListener('input', function () {
		if (getNumberOfSqFt() == '') {
			hideTotalPrice(true)
			hideCartonTxtSummary(true)
			hideCartonTxtSummaryPlaceholder(false)
		} else {
			hideCartonTxtSummaryPlaceholder(true)
			hideCartonTxtSummary(false)
			const numberOfCartonsRequired = calculateNumberOfBoxesRequired()
			setValueOfCartonInput(numberOfCartonsRequired)
			setValueOfCartonInputWithoutReserve(numberOfCartonsRequired)
			setValueOfCartonsInPriceSummary(numberOfCartonsRequired)
			const SqFts = (calculateNumberOfTilesInCarton(numberOfCartonsRequired)).toFixed(2)
			setValueOfSqFtPriceSummary(SqFts)
			hideTotalPrice(false)
			setValueOfTotalPrice(calculatePrice(SqFts))
		}


	})

	document.getElementById('carton-input').addEventListener('input', function () {
		if (getNumberOfCartonsInputValue() == '') {
			hideTotalPrice(true)
			hideCartonTxtSummaryPlaceholder(false)
			hideCartonTxtSummary(true)
		} else {
			setValueOfCartonInputWithoutReserve(document.getElementById('carton-input').value)
			processAndDisplaySummary()
		}

	})

	function processAndDisplaySummary() {
		const numberOfSquareFootage = (calculateNumberOfTilesInCarton(getNumberOfCartonsInputValue()))
		totalPrice = calculatePrice(numberOfSquareFootage)
		setValueOfCartonsInPriceSummary(getNumberOfCartonsInputValue());
		setValueOfSqFtPriceSummary(numberOfSquareFootage)
		setValueOfTotalPrice(totalPrice.toFixed(2))
		hideTotalPrice(false)
		hideCartonTxtSummaryPlaceholder(true)
		hideCartonTxtSummary(false)
	}

	document.getElementById('extra-tiles-checkbox').addEventListener('change', function () {
		const checkbox = document.getElementById('extra-tiles-checkbox')
		if(checkbox.checked){
			const cartonInputValue = parseInt(getNumberOfCartonsInputValueWithoutReserve())
			const numberOfReserveCartons = parseInt(cartonInputValue) * 0.1
			setValueOfCartonInput(cartonInputValue + numberOfReserveCartons)
			processAndDisplaySummary()
		}else{
			const cartonInputValueWithoutReserve = (getNumberOfCartonsInputValueWithoutReserve())
			const cartonInputValue = getNumberOfCartonsInputValue()
			const numberOfReserveCartons = parseInt(cartonInputValueWithoutReserve) * 0.1
			setValueOfCartonInput(cartonInputValue - parseInt(numberOfReserveCartons))
			processAndDisplaySummary()

		}

	})


})
