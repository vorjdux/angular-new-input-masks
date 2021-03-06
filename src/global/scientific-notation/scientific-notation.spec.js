var StringMask = require('string-mask');

describe('ui.utils.masks.scientific-notation:', function() {
	beforeEach(function() {
		browser.get('/src/global/scientific-notation/scientific-notation.html');
	});

	it('should load the demo page', function() {
		expect(browser.getTitle()).toEqual('Scientific Notation Spec');
	});

	describe('ui-scientific-notation-mask:', function() {
		it('should format scientific notation number with two decimal places (default)', function() {
			var significandViewMask = new StringMask('0,00',{reverse:true}),
				significandToFormat = '',
				exponentToFormat = '',
				formatedSignificand, splittedInputValue;

			var input = element(by.model('scientificNotationMask')),
				value = element(by.binding('scientificNotationMask'));

			for (var i = 1; i <= 3; i++) {
				input.sendKeys(i);
				significandToFormat += i;
				formatedSignificand = significandViewMask.apply(significandToFormat);
				expect(input.getAttribute('value')).toEqual(formatedSignificand);
				expect(value.getText()).toMatch(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/);
			}

			for (var i = 1; i <= 3; i++) {
				input.sendKeys(i);
				exponentToFormat += i;
				expect(input.getAttribute('value')).toEqual(formatedSignificand + 'e' + exponentToFormat);
				expect(value.getText()).toMatch(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/);
			}

			for (var i = 1; i < 3; i++) {
				input.sendKeys(protractor.Key.BACK_SPACE);
				exponentToFormat = exponentToFormat.slice(0, -1);
				expect(input.getAttribute('value')).toEqual(formatedSignificand + 'e' + exponentToFormat);
				expect(value.getText()).toMatch(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/);
			}

			input.sendKeys(protractor.Key.BACK_SPACE);
			expect(input.getAttribute('value')).toEqual(formatedSignificand);
			for (var i = 1; i < 3; i++) {
				input.sendKeys(protractor.Key.BACK_SPACE);
				significandToFormat = significandToFormat.slice(0, -1);
				formatedSignificand = significandViewMask.apply(significandToFormat);
				expect(input.getAttribute('value')).toEqual(formatedSignificand);
				expect(value.getText()).toMatch(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/);
			}

			input.sendKeys(protractor.Key.BACK_SPACE);
			expect(input.getAttribute('value')).toEqual('0,00');
			expect(value.getText()).toEqual('0');
		});

		it('should format scientific notation number with four decimal places (parameter)', function() {
			var significandViewMask = new StringMask('0,0000',{reverse:true}),
				significandToFormat = '',
				exponentToFormat = '',
				formatedSignificand, splittedInputValue;

			var input = element(by.model('initializedScientificNotationMask')),
				value = element(by.binding('initializedScientificNotationMask'));

			input.clear();
			for (var i = 1; i <= 5; i++) {
				input.sendKeys(i);
				significandToFormat += i;
				formatedSignificand = significandViewMask.apply(significandToFormat);
				expect(input.getAttribute('value')).toEqual(formatedSignificand);
				expect(value.getText()).toMatch(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/);
			}

			for (var i = 1; i <= 3; i++) {
				input.sendKeys(i);
				exponentToFormat += i;
				expect(input.getAttribute('value')).toEqual(formatedSignificand + 'e' + exponentToFormat);
				expect(value.getText()).toMatch(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/);
			}

			for (var i = 1; i < 3; i++) {
				input.sendKeys(protractor.Key.BACK_SPACE);
				exponentToFormat = exponentToFormat.slice(0, -1);
				expect(input.getAttribute('value')).toEqual(formatedSignificand + 'e' + exponentToFormat);
				expect(value.getText()).toMatch(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/);
			}

			input.sendKeys(protractor.Key.BACK_SPACE);
			expect(input.getAttribute('value')).toEqual(formatedSignificand);
			for (var i = 1; i < 5; i++) {
				input.sendKeys(protractor.Key.BACK_SPACE);
				significandToFormat = significandToFormat.slice(0, -1);
				formatedSignificand = significandViewMask.apply(significandToFormat);
				expect(input.getAttribute('value')).toEqual(formatedSignificand);
				expect(value.getText()).toMatch(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/);
			}

			input.sendKeys(protractor.Key.BACK_SPACE);
			expect(input.getAttribute('value')).toEqual('0,0000');
			expect(value.getText()).toEqual('0');
		});

		it('should format scientific notation for a model initialized', function() {
			var input = element(by.model('initializedScientificNotationMask')),
				value = element(by.binding('initializedScientificNotationMask'));

			expect(input.getAttribute('value')).toEqual('1,2346e4');
			expect(value.getText()).toEqual('12345.67890123456');
		});

		xit('should format scientific notation for a model initialized with exponential notation', function() {
			var input = element(by.model('initializedScientificNotationMaskWithE')),
				value = element(by.binding('initializedScientificNotationMaskWithE'));

			expect(input.getAttribute('value')).toEqual('1,23e127');
			expect(value.getText()).toEqual('1.23e+127');
		});

		it('should format number without decimal places (parameter)', function() {
			var significandViewMask = new StringMask('0',{reverse:true}),
				significandToFormat = '',
				exponentToFormat = '',
				formatedSignificand, splittedInputValue;

			var input = element(by.model('scientificNotationMaskWithoutDigits')),
				value = element(by.binding('scientificNotationMaskWithoutDigits'));

			input.sendKeys(7);
			significandToFormat = '7';
			formatedSignificand = '7';
			expect(input.getAttribute('value')).toEqual(significandToFormat);
			expect(value.getText()).toEqual(significandToFormat);

			for (var i = 1; i <= 3; i++) {
				input.sendKeys(i);
				exponentToFormat += i;
				expect(input.getAttribute('value')).toEqual(formatedSignificand + 'e' + exponentToFormat);
				expect(value.getText()).toMatch(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/);
			}

			for (var i = 1; i < 3; i++) {
				input.sendKeys(protractor.Key.BACK_SPACE);
				exponentToFormat = exponentToFormat.slice(0, -1);
				expect(input.getAttribute('value')).toEqual(formatedSignificand + 'e' + exponentToFormat);
				expect(value.getText()).toMatch(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/);
			}

			input.sendKeys(protractor.Key.BACK_SPACE);
			expect(input.getAttribute('value')).toEqual(formatedSignificand);

			input.sendKeys(protractor.Key.BACK_SPACE);
			expect(input.getAttribute('value')).toEqual('');
			expect(value.getText()).toEqual('');
		});

		it('should accept 0 in all configurations', function() {
			var input = element(by.model('scientificNotationMask')),
				value = element(by.binding('scientificNotationMask'));

			input.clear();
			input.sendKeys(0);
			expect(input.getAttribute('value')).toEqual('0,00');
			expect(value.getText()).toEqual('0');

			input = element(by.model('initializedScientificNotationMask'));
			value = element(by.binding('initializedScientificNotationMask'));

			input.clear();
			input.sendKeys(0);
			expect(input.getAttribute('value')).toEqual('0,0000');
			expect(value.getText()).toEqual('0');

			input = element(by.model('scientificNotationMaskWithoutDigits'));
			value = element(by.binding('scientificNotationMaskWithoutDigits'));

			input.clear();
			input.sendKeys(0);
			expect(input.getAttribute('value')).toEqual('0');
			expect(value.getText()).toEqual('0');
		});
	});
});
