function strpos(haystack, needle, offset) {
	//  discuss at: http://phpjs.org/functions/strpos/
	// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: Onno Marsman
	// improved by: Brett Zamir (http://brett-zamir.me)
	// bugfixed by: Daniel Esteban
	//   example 1: strpos('Kevin van Zonneveld', 'e', 5);
	//   returns 1: 14

	var i = (haystack + '').indexOf(needle, (offset || 0));
	return i === -1 ? false : i;
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Modifies the current url changing the query parameters to the ones present
 * in the passed map
 */
function setUrlQuery(query, extra_parameters_string) {
	var uri = new URI();
	uri.setQuery(query);
	if (typeof extra_parameters_string !== "undefined") {
		uri.setQuery(URI.parseQuery(extra_parameters_string));
	}
	history.replaceState({}, '', uri.toString());
}

function showCorrectBenchDatasizes(benchSizes) {
	var selDatasizes = new Array();
	var selBenchSuites = new Array();
	var selBenchs = new Array();
	$("input[name='datasize[]'").each(function() {
		if($(this).prop('checked'))
			selDatasizes.push($(this).val());
	});
	$("input[name='bench_type[]'").each(function() {
		if($(this).prop('checked'))
			selBenchSuites.push($(this).val());
	});
	$("input[name='bench[]'").each(function() {
		if($(this).prop('checked'))
			selBenchs.push($(this).val());
	});

	//Then bench is select one
	if(selBenchs.length == 0) {
		selBenchs.push($("select[name='bench[]']").find(":selected").text());
	}

	$("input[name='datasize[]']").each(function() {
		$(this).parent().hide();
		$(this).prop('checked',false);
	});

	$.each(selBenchSuites, function(index, suite) {
		if(benchSizes[suite] != undefined) {
			$.each(selBenchs, function (index2, bench) {
				if(benchSizes[suite][bench] != undefined) {
					$.each(benchSizes[suite][bench], function (index3, datasize) {
						$("input[name='datasize[]'][value='" + datasize + "']").parent().show();
						if(selDatasizes.indexOf(datasize) > -1)
							$("input[name='datasize[]'][value='" + datasize + "']").prop('checked',true);
					});
				}
			});
		}
	});
}

function showCorrectBenchs(benchSizes) {
	var availBenchs = new Array();
	var reselect = false;
	$("input[name='bench_type[]'").each(function() {
		if($(this).prop('checked')) {
			var suite = $(this).val();
			$.each(benchSizes[suite],function(bench, datasizes) {
				availBenchs.push(bench);
			});
		}
	});

	if($("input[name='bench[]']").length > 0) {
		$("input[name='bench[]']").each(function(index,bench) {
			if(availBenchs.indexOf(bench) == -1 ) {
				if($(this).prop('checked')) {
					$(this).prop('checked', false);
					reselect = true;
				}
				$(this).parent().hide();
			} else {
				$(this).parent().show();
			}

			if(reselect)
				$("input[name='bench[]']:visible").first().prop('checked',true);
		});
	} else {
		$("select[name='bench[]'] option").each(function() {
			if(availBenchs.indexOf($(this).val()) == -1) {
				if($(this).prop('selected')) {
					$(this).prop('selected', false);
					reselect = true;
				}
				$(this).hide();
			} else {
				$(this).show();
			}

			if(reselect) {
				$("select[name='bench[]'] option:visible").first().prop('selected',true);
			}
		});
	}
}