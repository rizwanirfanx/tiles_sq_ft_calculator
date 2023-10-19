<?php
/*
Plugin Name: Tiles Price & Cartons Calculator
Description: This plugin calculates the price & number of cartons needed for given square feets of tiles
Version: 1.0
Author: Superuserx
*/

function wpdocs_theme_name_scripts()
{
	wp_enqueue_style('tws_calculator_style', plugins_url('/assets/styles.css', __FILE__));
	wp_enqueue_script('tws_calculator_script', plugins_url('/js/', __FILE__) . 'script.js', array(), '1.0.0', true);
}



function tws_before_add_to_cart_sq_ft_calculator()
{
	define('SQ_FT_PER_BOX_STRING', 'Square Feet Per Box');
	$product_id = get_the_id();
	$product = wc_get_product($product_id);
	$price = $product->get_price();

	$attribute_value = (float) $product->get_attribute(SQ_FT_PER_BOX_STRING);


?>
	<div class="container p-0 m-0">
		<form>
			<h5>How much do you need?</h5>
			<div class="">
				<div class="my-2">
					<div class="position-relative">
						<input id="sq-ft-per-box-input" value="<?= $attribute_value ?>" hidden />
						<input id="product-price" value="<?= $price ?>" hidden />
						<input name="sq-ft" id="sq-ft-input" type="number" class="form-control sm-font w-100" placeholder="Enter Square Footage">
						<p class="position-absolute sm-font" style="top: 20%; right: 30px; color: grey;">sq ft</p>
					</div>
					<p class="m-0">or</p>
				</div>
				<div class="my-2 position-relative">
					<input name="cartons" id="carton-input" type="text" class="form-control sm-font" placeholder="Enter Quantity">
					<p class="position-absolute sm-font" style="top: 20%; right: 20px; color: grey;">carton</p>
				</div>
				<div>
					<input type="checkbox" id="extra-tiles-checkbox" />
					<label for="extra-tiles-checkbox">Add 10% for waste and reserve</label>
				</div>
				<hr class="m-0 my-2" />
				<div id="price-summary-container">
					<div class="d-flex justify-content-between">
						<h5>Total Price</h5>
						<h5 class="d-none">$45000</h5>
					</div>
					<p id="cartons-summary-text" class="sm-font text-right m-0 d-none">X Cartons covers Y Sq.Ft</p>
					<p id="cartons-summary-text-placeholder" class="sm-font text-right m-0 " style="color: grey;">Please Enter Quantity</p>
				</div>
			</div>
		</form>
	</div>

<?php
}
add_action('wp_enqueue_scripts', 'wpdocs_theme_name_scripts');
add_action('woocommerce_before_add_to_cart_quantity', 'tws_before_add_to_cart_sq_ft_calculator');
