angular.module('app', []).controller("dictCtrl", function ($scope, $interval) {

	$scope.list = 0; // index of words list
	$scope.letter = ''; // random letter
	$scope.countDown = 0; // count down timer

	// timer:
	$interval(function () {
		if ($scope.countDown > 0) {
			$scope.countDown--;
		}
	}, 1000, 0);

	// generate words list index and random letter:
	$scope.gen = function (userInput) {
		var x = rnd(userInput);
		var list = Number(x.toString().substring(11, 20)) % 12;
		var letter = Number(x.toString().substring(11, 20)) % 26;
		// alert("x = " + x + ", list = " + list + ", letter = " + letter);
		$scope.list = list;
		$scope.letter = String.fromCharCode(65 + letter);
		$scope.countDown = 120;
	}

	// seeded pseudo random using sine:
	var seed = 12345;
	function rnd(userInput) {
		seed += userInput.trim().toUpperCase().split('').map(l => l.charCodeAt(0)).reduce((accum, i) => accum * 7 + i, 0);
		var x = Math.sin(seed) * 10000;
		return x - Math.floor(x);
	}

	// get the list of 12 questions:
	$scope.getList = function () {
		var words = new Array();
		for (var i = 0; i < 12; i++) {
			words[i] = $scope.db[i][$scope.list];
		}
		return words;
	}

	$scope.db = [
		["A boy’s name", "Authors", "School supplies", "Breakfast foods", "Sandwiches", "Nicknames", "Fictional characters", "Things that are sticky", "Restaurants", "Sports", "Baby foods", "Vegetables", "Video games", "Kinds of soup", "Things in a grocery store", "Honeymoon spots", "Words with double letters", "Reasons to make a phone call"],
		["A river", "Bodies of water", "Things that are hot", "Gifts", "Items in a catalog", "Things in the sky", "Menu items", "Awards/ceremonies", "Notorious people", "Song titles", "Famous duos and trios", "States", "Electronic gadgets", "Things found in New York", "Reasons to quit your job", "Things you buy for kids", "Children’s books", "Types of weather"],
		["An animal", "A bird", "Heroes", "Flowers", "World leaders/Poloticians", "Pizza toppings", "Magazines", "Cars", "Fruits", "Parts of the body", "Things found in a desk", "Things you throw away", "Board games", "Things you get tickets for", "Things that have stripes", "Things that can kill you", "Things found at a bar", "Titles people can have"],
		["Things that are cold", "Countries", "A girl’s name", "Ice cream flavors", "School subjects", "Colleges/Universities", "Capitals", "Spices/Herbs", "Things in a medicine cabinet", "Ethnic foods", "Vacation spots", "Occupations", "Things that use a remote", "Things you do at work", "Tourist attractions", "Reasons to take out a loan", "Sports played outdoors", "Things that have buttons"],
		["Insects", "Cartoon characters", "Fears", "A drink", "Excuses for being late", "Fish", "Kinds of candy", "Bad habits", "Toys", "Things you shout", "Diseases", "Appliances", "Card games", "Foreign words used in English", "Diet foods", "Words associated with winter", "Names used in songs", "Items you take on a road trip"],
		["TV Shows", "Holidays", "TV Stars", "Toys", "Ice cream flavors", "Countries", "Items you save up to buy", "Cosmetics/Toiletries", "Household chores", "Birds", "Words associated with money", "Cartoon characters", "Internet lingo", "Things you shouldn’t touch", "Things found in a hospital", "Things to do on a date", "Foods you eat raw", "Things that have wheels"],
		["Things that grow", "Things that are square", "Colors", "Cities", "Things that jump/bounce", "Things that have spots", "Footware", "Celebrities", "Bodies of water", "A girl’s name", "Items in a vending machine", "Types of drinks", "Offensive words", "Spicy foods", "Food/Drink that is green", "Historic events", "Places in Europe", "Reasons to call 911"],
		["Fruits", "In the NWT (Northwest Territories, Canada)", "A fish", "Things in the kitchen", "Television stars", "Historical Figures", "Something you keep hidden", "Cooking utensils", "Authors", "Ways to get from here to there", "Movie Titles", "Musical groups", "Wireless things", "Things at a carnival", "Weekend Activities", "Things you store items in", "Olympic events", "Things that make you smile"],
		["Things that are black", "Clothing", "Fruits", "Ocean things", "Things in a park", "Something you’re afraid oF", "Items in a suitcase", "Reptiles/Amphibians", "Halloween costumes", "Items in a kitchen", "Games", "Store names", "Computer parts", "Things you make", "Acronyms", "Things you do everyday", "Things you see at the zoo", "Ways to kill time"],
		["School subjects", "A relative", "Provinces or States", "Nicknames", "Foriegn cities", "Terms of endearment", "Things with tails", "Parks", "Weapons", "Villains", "Things you wear", "Things at a football game", "Software", "Places to hangout", "Seafood", "Things you get in the mail", "Math terms", "Things that can get you fired"],
		["Movie titles", "Games", "Sports equipment", "Hobbies", "Stones/Gems", "Items in this room", "Sports equiptment", "Leisure activities", "Things that are round", "Flowers", "Beers", "Trees", "Websites", "Animal noises", "Christmas songs", "Things you save up to buy", "Animals in books or movies", "Hobbies"],
		["Musical Instruments", "Sports Stars", "Tools", "Parts of the body", "Musical instruments", "Drugs that are abused", "Crimes", "Things you’re allergic to", "Words associated with exercise", "Things you replace", "Things at a circus", "Personality traits", "Game terms", "Computer programs", "Words ending in “-n”", "Things you sit/on", "Things to do at a party", "Holiday Activities"]
	];
});
