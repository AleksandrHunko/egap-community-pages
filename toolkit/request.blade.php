@extends('site.layouts.app')

@section('recaptcha')
    {!! ReCaptcha::htmlScriptTagJsApi() !!}
@endsection

@section('content')
    <div class="main-form">
        @if ($errors->any())
            <div style="border:red solid 2px; padding: 10px 10px 10px 30px; color:red;">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        @if(session()->get('success'))
            <div class="alert alert-success">
                {{ session()->get('success') }}
            </div>
        @else
            <h3>Заповніть форму та отримайте посилання на анкету для участі</h3>
            <br>
            <p>На цій сторінці ви можете створити заявку на підключення вашої громади до платформи «СВОЇ».</p>
            <p>Для створення заявки заповніть запропоновану форму на натисніть кнопку «Подати заяву на підключення».</p>
            <br>
            <form action="{{ asset ('request') }}" method="POST">
                @csrf
                <div class="stylyzed-input long-input">
                    <input autocomplete="off" id="gromada" name="gromada" value="{{ old('gromada') }}" required>
                    <label class="input-label">
                        <span class="input-span">Назва громади</span>
                    </label>
                </div>
                <select id="region_name" name="region_name" required>
                    <option selected disabled value="">Оберіть регіон...</option>
                    @foreach ($regions as $region)
                        <option value="{{ $region->name }}" {{ old('region_name') == $region->name ? 'selected' : '' }}>{{ $region->name }}</option>
                    @endforeach
                </select>
                <br>
                <div class="stylyzed-input long-input">
                    <input type="text" id="pib" name="pib" value="{{ old('pib') }}" required>
                    <label class="input-label">
                        <span class="input-span">ПІБ контактної особи</span>
                    </label>
                    <span id="emailHelp" class="form-text text-muted">
                        Необхідно зазначити ПІБ особи, яка в майбутньому буде здійснювати налаштування чат-бота.
                    </span>
                </div>
                <div class="stylyzed-input long-input">
                    <input type="text" id="phone" name="phone" value="{{ old('phone') }}" required pattern="\+380[0-9]{9}">
                    <label class="input-label">
                        <span class="input-span">Телефон контактної особи у форматі: +380XXXXXXXXX</span>
                    </label>
                </div>
                <div class="stylyzed-input long-input">
                    <input type="email" id="name" name="email" value="{{ old('email') }}" required>
                    <label class="input-label">
                        <span class="input-span">Email контактної особи</span>
                    </label>
                </div>
                <div>
                    <p style="font-weight: 700; margin: 32px 0 16px 0;">
                        Які можливості платформи «СВОЇ» планує підключити Ваша громада?
                    </p>
                    <input type="checkbox" name="platform_service[]" value="чат-бот" @if(is_array(old('platform_service')) && in_array('чат-бот', old('platform_service'))) checked @endif> <span class="normal">створити чат-бот громади</span><br>
                    <input type="checkbox" name="platform_service[]" value="сайт громади" @if(is_array(old('platform_service')) && in_array('сайт громади', old('platform_service'))) checked @endif> <span class="normal">створити сайт громади</span><br>
                    <input type="checkbox" name="platform_service[]" value="сайт ЦНАП громади" @if(is_array(old('platform_service')) && in_array('сайт ЦНАП громади', old('platform_service'))) checked @endif> <span class="normal">створити сайт ЦНАП громади</span><br>
                </div>
                <div>
                    <p style="font-weight: 700; margin: 32px 0 16px 0;">
                        Які інструменти е-демократії на Платформі E-Dem планує підключити Ваша громада?
                    </p>
                    <input type="checkbox" name="edem_services[]" value="е-петиції" @if(is_array(old('edem_services')) && in_array('е-петиції', old('edem_services'))) checked @endif> <span class="normal">е-петиції</span><br>
                    <input type="checkbox" name="edem_services[]" value="громадський бюджет" @if(is_array(old('edem_services')) && in_array('громадський бюджет', old('edem_services'))) checked @endif> <span class="normal">громадський бюджет</span><br>
                    <input type="checkbox" name="edem_services[]" value="е-консультації" @if(is_array(old('edem_services')) && in_array('е-консультації', old('edem_services'))) checked @endif> <span class="normal">е-консультації</span><br>
                    <input type="checkbox" name="edem_services[]" value="відкрите місто" @if(is_array(old('edem_services')) && in_array('відкрите місто', old('edem_services'))) checked @endif> <span class="normal">відкрите місто</span>
                </div>
                <br>
                <div class="captcha">
                    {!! ReCaptcha::htmlFormSnippet() !!}
                </div>
                
                <p style="color:#FF0000; margin:24px 0;">
                <span id="emailHelp" class="form-text text-muted">* Всі поля є обов`язковими для заповнення.</span>
                </p>
                
                <button type="submit" class="black-button long">Подати заявку на підключення</button>
            </form>
        @endif
    </div>
@endsection
