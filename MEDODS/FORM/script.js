Vue.use(window.vuelidate.default)
		const { required, minLength, numeric, maxLength, minValue, maxValue } = window.validators
		Vue.config.devtools = true;
		new Vue({
			/*setup () {
   				return { v$: useVuelidate() }
  			},*/
  			el: "#app",
			data: {
				sMsg: false,
				isSubmitted: false,
				isError: false,
				name: null,
				surname: null,
				middleName: 'Иванович',
				sex: 'Мужской',
				phone: null,
				nosms: false,
				addressIndex: null,
				addressCountry: null,
				addressRegion: null,
				addressCity: null,
				addressStreet: null,
				addressHouse: null,
				passportSeria: null,
				passportNumber: null,
				passportOtdel: null,
				birghtData: '2000-03-30',
				passportData: '2000-03-30',
				birghtday: 30,
				birghtmounth: 'Февраля',
				birghtyear: 2000,
				passportDay: 30,
				passportMounth: 'Февраля',
				passportYear: 2000,
				clientGroup: null,
				doctor: 0,
				passportType: 0,
				arClientGroup: ['VIP', 'Проблемные', 'ОМС'],
				arDoctor:  ['Иванов', 'Захаров', 'Чернышева'],
				arMounth: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
				arPassport: ['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение'],
			},
			methods: {
				send() {
					this.isSubmitted = true;
					const isBirghtMounth = (element) => element == this.birghtmounth;
					const isPassMounth = (element) => element == this.passportMounth;
					this.passportData = this.passportYear + '-'
					+ (this.arMounth.findIndex( isPassMounth ) + 1) 
					 + '-' + this.passportDay;
					this.passportData = Date.parse(this.passportData);
					this.birghtData = this.birghtyear + '-'
					 + (this.arMounth.findIndex( isBirghtMounth ) + 1) 
					 + '-' + this.birghtday;
					 
					this.birghtData = Date.parse(this.birghtData);

					if (this.$v.$invalid === false) {
						this.sMsg = 'Спасибо. Клиент успешно добавлен!';
						this.isError = false;
					}
					else {
						this.isError = true;
						arFields = ['surname', 'name', 'phone', 'birghtData', 'passportData', 'clientGroup', 'addressCity', 'passportType'];
						arFieldsName = ['Фамилию', 'Имя', 'Телефон', 'Дата рождения', 'Дата выдачи паспорта', 'Группа клиентов', 'Город', 'Тип паспорта' ];
						this.sMsg = 'Пожалуйста заполните верно поля: ';
						for (let ii = 0; ii < arFields.length; ii++)
							if (this.$v[ arFields[ii] ].$invalid)
								this.sMsg += '"' + arFieldsName[ii] + '" ';
						if (this.$v.phone.$invalid)
							this.sMsg += ' поле телефон, должно содержать 11-значный номер.';
					}
					
					return false;
				},
			},
			validations: {
					surname: { required },
					name: { required },
					phone: {
						required,
						numeric,
						minLength: minLength(11),
						maxLength: maxLength(11),
					},
					birghtData: {
						required,
						minValue: value => value > Date.parse('1921-01-01'),
						maxValue: value => value < Date.parse('2021-12-31'),
						//minLength: minValue: value => value > new Date().toISOString()
					},
					passportData: {
						required,
						minValue: value => value > Date.parse('1921-01-01'),
						maxValue: value => value < Date.parse('2021-12-31'),
						//minLength: minValue: value => value > new Date().toISOString()
					},
					clientGroup: {
						required,
					},
					addressCity: {
						required
					},
					passportType: {
						required,
						minValue: value => value ? true : false,
					}
			}
		});
