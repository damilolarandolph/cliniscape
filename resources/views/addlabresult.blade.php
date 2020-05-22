@extends('master')
@section('css')
<link href="{{asset('css/spreadsheet.css')}}" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
@endsection


@section('main-content')
<div class="col">
  <div class="card">
    <div class="card-header">
      Add Lab Result For Patient
    </div>
    <div class="card-body">
      <form id="resultform" method="POST" enctype="multipart/form-data">
        @csrf
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
              aria-controls="pills-home" aria-selected="true">Add User Details and Description</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"
              aria-controls="pills-profile" aria-selected="false">Add Result Data</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab"
              aria-controls="pills-contact" aria-selected="false">Add Images</a>
          </li>
        </ul>

        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <div class="form-group">
              <label for="exampleFormControlInput1">Title Of Result</label>
              <input required name="resulttitle" type="text" class="form-control" placeholder="Please enter a title">
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Patient Email Address</label>
              <input type="text" class="form-control" id="emailsearch" placeholder="name@example.com">
            </div>
            <div class="form-group">
              <label>Patient Email Search Results</label>
              <ul id='results' class="list-group">
              </ul>
            </div>

            <div class="form-group">
              <label> Description </label>
              <textarea class="form-control" name="resultdescription"></textarea>
            </div>
          </div>
          <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            <div style="height: 70vh" class="row mb-2">
              <div class="col mh-100" id="spreadsheet"></div>
              <input hidden name="resultsheet" id="resultdata" />
            </div>
          </div>
          <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
            <div class="custom-file form-group mb-2">
              <input name="resultimages[]" onchange="renderFiles(event)" type="file" class="custom-file-input"
                id="images" multiple="multiple">
              <label class="custom-file-label" for="customFile">Choose file</label>
            </div>
            <div class="card mb-2">
              <div class="card-header">
                Uploaded Files
              </div>
              <div class="card-body mb-2">
                <div id='chosenFiles' class="row">
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit !</button>
      </form>
    </div>
  </div>
</div>
@endsection

@section('js')
<script src="{{asset('js/spreadsheet.js')}}"></script>
<script>
  let curr = document.getElementById('emailsearch');
  let result = document.getElementById('results');
  let elems = [
    @foreach ($patients as $patient)
    @if(!$loop->first),@endif"{{$patient->email}}"
  @endforeach
  ];

  let string = `<li class="list-group-item d-flex justify-content-between align-items-center">
                  Hey
                  <span class="align-middle">
                    <input type="radio" name="doctoremail" id="email" value="">
                  </span>
                </li>`

  function clear(){
      result.innerHTML = '';
  }

  clear()

  function render(query){
   clear();
   let matchArray = elems.filter((v)=>v.includes(query));
   if (matchArray.length == 0){
     result.innerHTML = '<p>Patient Not Found</p>';
     return ;
   }
   let matchArrayElems = matchArray.map((v)=>{
      return `<li style="opactity: 1;transition: all 0.5s;" class="list-group-item d-flex justify-content-between align-items-center">
                  ${v}
                  <span class="align-middle">
                    <input type="radio" name="patientemail" id="email" value="${v}">
                  </span>
                </li>`
   });

   result.innerHTML = matchArrayElems.join('');
   

  }
  curr.addEventListener('keyup', function(event){
    render(event.target.value);
  });

  var spreadsheet = new dhx.Spreadsheet("spreadsheet", {
    toolbarBlocks: ["undo", "colors", "decoration", "align", "lock", "clear", 
        "rows", "columns", "help", "format", "file"],
    editLine: true,
    menu: true,
    rowsCount: 10,
    colsCount: 10
});

document.getElementById('resultform').addEventListener('submit', function(){
  document.getElementById('resultdata').value = JSON.stringify(spreadsheet.serialize());
});

let images = document.getElementById('images');
let chosenFiles = document.getElementById('chosenFiles');

function clearImagePreviews(){
  chosenFiles.innerHTML = '';
}

function renderFiles(event){
  clearImagePreviews();
  if (event.target.files.length == 0){
  return;
  }

  let length = event.target.files.length;
  let imagesArr = [];
  let files = event.target.files
  for (let a = 0; a < length; ++a){
    imagesArr.push(`<div class="col-md-2 p-2">
  <img src="${window.URL.createObjectURL(files[a])}" class="img-fluid" alt="Responsive image">
  </div>`);
  }

  chosenFiles.innerHTML = imagesArr.join('');
 

}



</script>
@endsection