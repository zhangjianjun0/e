var Toast = {
	makeText(str) {
		$("#toast").show();
		$("#toast").html(str);
		$("#toast").animate({
			opacity: 1,
			top: '6%'
		}, 600, 'linear')
		setTimeout(function() {
			$("#toast").animate({
				opacity: 1,
				top: '0%'
			}, 600, 'linear',function() {$("#toast").hide();})
		}, 1000);

	}
}

export default Toast;