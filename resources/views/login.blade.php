<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>GAWAI | Log in</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="{!! asset('AdminLTE-245/bower_components/bootstrap/dist/css/bootstrap.min.css') !!} ">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{!! asset('AdminLTE-245/bower_components/font-awesome/css/font-awesome.min.css') !!}">
  <!-- Ionicons -->
  <link rel="stylesheet" href="{!! asset('AdminLTE-245/bower_components/Ionicons/css/ionicons.min.css') !!}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{!! asset('AdminLTE-245/dist/css/AdminLTE.min.css') !!}">
  <!-- iCheck -->
  <link rel="stylesheet" href=".{!! asset('AdminLTE-245/plugins/iCheck/square/blue.css') !!}">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <a href="{{url('/')}}"><b>DIGINVITE</b></a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body" style="border-radius: 20px; border: 1px solid #3c8dbc;">
    <p class="login-box-msg">Sign in to start your session</p>

    <form method="POST" action="{{ route('login') }}">
        @csrf
      <div class="form-group row">
          <div class="col-md-12">
            @if ($errors->has('email'))
              <span class="invalid-feedback" role="alert">
                <strong class="text-danger">{{ $errors->first('email') }}</strong>
              </span>
            @endif
            <div class="form-group has-feedback">
              <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus placeholder="Email" style="border-radius: 10px;">
              <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
          </div>
      </div>
      <div class="form-group row">
          <div class="col-md-12">
            <div class="form-group has-feedback">
              @if ($errors->has('password'))
                <span class="invalid-feedback" role="alert">
                  <strong class="text-danger">{{ $errors->first('password') }}</strong>
                </span>
              @endif
              <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required placeholder="Password" style="border-radius: 10px;">
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
          </div>
      </div>
      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox">
            <label>
              <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
              </div>
            </label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat" style="border-radius: 10px;"><i class="fa fa-sign-in"></i> Login</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

    {{-- <div class="social-auth-links text-center">
      <p>- OR -</p>
      <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
        Facebook</a>
      <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
        Google+</a>
    </div> --}}
    <!-- /.social-auth-links -->

    <a href="#">I forgot my password</a><br>
    {{-- <a href="#" class="text-center">Register a new membership</a> --}}

  </div>
  <!-- /.login-box-body -->
  <br>
  <div class="text-center">
    <p><strong>Copyright © 2019 DIGINVITE.COM. </strong> All rights reserved.</p>
  </div>
</div>
<!-- /.login-box -->

<!-- jQuery 3 -->
<script src="{!! asset('AdminLTE-245/bower_components/jquery/dist/jquery.min.js') !!}"></script>
<!-- Bootstrap 3.3.7 -->
<script src="{!! asset('AdminLTE-245/bower_components/bootstrap/dist/js/bootstrap.min.js') !!}"></script>
<!-- iCheck -->
<script src="{!! asset('AdminLTE-245/plugins/iCheck/icheck.min.js') !!}"></script>
{{-- <script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' /* optional */
    });
  });
</script> --}}
</body>
</html>
