angular.module('app', []).controller("dictCtrl", function ($scope, $interval) {

	$scope.word_list = [];
	$scope.letter = ''; // random letter
	$scope.countDown = 0; // count down timer

	// timer:
	const totalTime = 1;
	$interval(function () {
		if ($scope.countDown > 0) {
			$scope.countDown--;
		}
	}, 1000, 0);

	// generate list list index and random letter:
	$scope.gen = function (entropy) {
		rnd(entropy);
		let ascii = Math.floor(rnd() * 26);
		$scope.letter = String.fromCharCode(65 + ascii);

		$scope.word_list = [...Array(12).keys()].map(getWord);
		$scope.countDown = totalTime;
	}

	// seeded pseudo random using sine:
	let seed = 735632791;
	function rnd(entropy) {
		seed += entropy ? entropy.trim().toUpperCase().split('').map(l => l.charCodeAt(0)).reduce((accum, i) => accum * 31 + i, 7) : 32452843;
		seed %= 982451653;
		let x = Math.sin(seed) * 10000;
		x -= Math.floor(x);
		console.log('=> rnd = ' + x);
		return x;
	}


	let getWord = function () {
		let list = [];
		return function () {
			console.log('there are %d words in the list', list.length);
			if (!list.length) {
				console.log('restocking...');
				list = word_bank.slice();
			}
			let index = Math.floor(rnd() * list.length);
			return list.splice(index, 1)[0];
		}
	}();

	const word_bank = [
		"A bird", "A boy’s name", "A drink", "A fish", "A girl’s name", "A relative", "A river", "Acronyms", "An animal", "Animal noises", "Animals in books or movies",
		"Appliances", "Authors", "Awards/ceremonies", "Baby foods", "Bad habits", "Beers", "Birds", "Board games", "Bodies of water", "Breakfast foods", "Capitals",
		"Card games", "Cars", "Cartoon characters", "Celebrities", "Children’s books", "Christmas songs", "Cities", "Clothing", "Colleges/Universities", "Colors",
		"Computer parts", "Computer programs", "Cooking utensils", "Cosmetics/Toiletries", "Countries", "Crimes", "Diet foods", "Diseases", "Drugs that are abused",
		"Electronic gadgets", "Ethnic foods", "Excuses for being late", "Famous duos and trios", "Fears", "Fictional characters", "Fish", "Flowers",
		"Food/Drink that is green", "Foods you eat raw", "Footwear", "Foreign list used in English", "Foriegn cities", "Fruits", "Game terms", "Games", "Gifts",
		"Halloween costumes", "Heroes", "Historic events", "Historical Figures", "Hobbies", "Holiday Activities ", "Holidays", "Honeymoon spots", "Household chores",
		"Ice cream flavors", "In the NWT (Northwest Territories, Canada)", "Insects", "Internet lingo", "Items in a catalog", "Items in a kitchen", "Items in a suitcase",
		"Items in a vending machine", "Items in this room", "Items you save up to buy", "Items you take on a road trip", "Kinds of candy", "Kinds of soup", "Leisure activities",
		"Magazines", "Math terms", "Menu items", "Movie titles", "Musical Instruments", "Musical groups", "Musical instruments", "Names used in songs", "Nicknames", "Notorious people",
		"Occupations", "Ocean things", "Offensive list", "Olympic events", "Parks", "Parts of the body", "Personality traits", "Pizza toppings", "Places in Europe", "Places to hangout",
		"Provinces or States", "Reasons to call 911", "Reasons to make a phone call", "Reasons to quit your job", "Reasons to take out a loan", "Reptiles/Amphibians", "Restaurants",
		"Sandwiches", "School subjects", "School supplies", "Seafood", "Software", "Something you keep hidden", "Something you’re afraid oF", "Song titles", "Spices/Herbs", "Spicy foods",
		"Sports", "Sports Stars", "Sports equipment", "Sports equiptment", "Sports played outdoors", "States", "Stones/Gems", "Store names", "TV Shows", "TV Stars", "Television stars",
		"Terms of endearment", "Things at a carnival", "Things at a circus", "Things at a football game", "Things found at a bar", "Things found in New York", "Things found in a desk",
		"Things found in a hospital", "Things in a grocery store", "Things in a medicine cabinet", "Things in a park", "Things in the kitchen", "Things in the sky",
		"Things that are black", "Things that are cold", "Things that are hot", "Things that are round", "Things that are square", "Things that are sticky",
		"Things that can get you fired", "Things that can kill you", "Things that grow", "Things that have buttons", "Things that have spots", "Things that have stripes",
		"Things that have wheels", "Things that jump/bounce", "Things that make you smile", "Things that use a remote", "Things to do at a party", "Things to do on a date",
		"Things with tails", "Things you buy for kids", "Things you do at work", "Things you do everyday", "Things you get in the mail", "Things you get tickets for", "Things you make",
		"Things you replace", "Things you save up to buy", "Things you see at the zoo", "Things you shouldn’t touch", "Things you shout", "Things you sit/on", "Things you store items in",
		"Things you throw away", "Things you wear", "Things you’re allergic to", "Titles people can have", "Tools", "Tourist attractions", "Toys", "Trees", "Types of drinks",
		"Types of weather", "Vacation spots", "Vegetables", "Video games", "Villains", "Ways to get from here to there", "Ways to kill time", "Weapons", "Websites", "Weekend Activities",
		"Wireless things", "Words associated with exercise", "Words associated with money", "Words associated with summer", "Words associated with winter", "Words ending in “-n”", "Words with double letters"
	];
});
