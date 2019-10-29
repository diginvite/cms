<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>CMS - Diginvite</title>
  <!-- Scripts -->
  {{-- <script src="{{ asset('js/app.js') }}" defer></script> --}}
  <!-- Fonts -->
  <link rel="dns-prefetch" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="{!! asset('AdminLTE-245/bower_components/bootstrap/dist/css/bootstrap.css') !!}">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{!! asset('AdminLTE-245/bower_components/font-awesome/css/font-awesome.min.css') !!}">
  <!-- Ionicons -->
  <link rel="stylesheet" href="{!! asset('AdminLTE-245/bower_components/Ionicons/css/ionicons.min.css') !!}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{!! asset('AdminLTE-245/dist/css/AdminLTE.css') !!}">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="{!! asset('AdminLTE-245/dist/css/skins/_all-skins.min.css') !!}">
  {{-- to str --}}
  <link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet">
  <!-- Pace style -->
  <link rel="stylesheet" href="{!! asset('AdminLTE-245/plugins/pace/pace.min.css') !!}">
  {{-- ajat --}}
  <link rel="stylesheet" href="{!! asset('ajat/css/style.css') !!}">
      {{--  cloudinary  --}}
    <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>  
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZAMH3V01G3WxbAHjw8SmCrrnHzuEns6E&libraries=places"></script>
</head>
<body class="hold-transition skin-blue sidebar-mini">

    @yield('content')

    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
         ]); ?>
    </script>
    <script crossorigin src="{{ asset('js/app.js') }}"></script>
    {{-- <script src="//tinymce.cachefly.net/4.2/tinymce.min.js"></script> --}}
    {{-- nanobar --}}
    <script src="{{asset('nanobar/nanobar.js')}}"></script>
    {{-- pace --}}
    <script src="{{asset('pace/pace.min.js')}}"></script>
    <!-- jQuery 3 -->
    <script src="{!! asset('AdminLTE-245/bower_components/jquery/dist/jquery.min.js') !!}"></script>
    <!-- Bootstrap 3.3.7 -->
    <script src="{!! asset('AdminLTE-245/bower_components/bootstrap/dist/js/bootstrap.min.js') !!}"></script>
    <!-- Slimscroll -->
    <script src="{!! asset('AdminLTE-245/bower_components/jquery-slimscroll/jquery.slimscroll.min.js') !!}"></script>
    <!-- FastClick -->
    <script src="{!! asset('AdminLTE-245/bower_components/fastclick/lib/fastclick.js') !!}"></script>
    <!-- AdminLTE App -->
    <script src="{!! asset('AdminLTE-245/dist/js/adminlte.min.js') !!}"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="{!! asset('AdminLTE-245/dist/js/demo.js') !!}"></script>
    {{-- to str --}}
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <!-- PACE -->
    <script src="{!! asset('AdminLTE-245/bower_components/PACE/pace.min.js') !!}"></script>
    <!-- page script -->
    <script type="text/javascript">
      // To make Pace works on Ajax calls
      $(document).ajaxStart(function () {
        Pace.restart()
      })
      $('.ajax').click(function () {
        $.ajax({
          url: '#', success: function (result) {
            $('.ajax-content').html('<hr>Ajax Request Completed !')
          }
        })
      })
    </script>
    {{--  <script src="{{asset('vendor/laravel-filemanager/js/lfm.js')}}"></script>
    <script type="text/javascript">
        $('#lfm').filemanager('image');
    </script>  --}}
</body>

</html>
