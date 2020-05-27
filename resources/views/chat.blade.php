@extends('master')

@inject('doctors', 'App\Doctor')
@inject('patients', 'App\User')

@section('routename')
Chat Box
@endsection
@section('title')
Chat
@endsection


@section('css')
<style>
    .hoverable {
        transition: all 0.5s;
        cursor: pointer;
    }

    .hoverable:hover {
        transition: all 0.5s;
        background-color: antiquewhite;

    }
</style>
@endsection

@section('main-content')
<div class="container-fluid">
    <div class="row h-100">

        <div class="col-3">
            <div class="card w-100">
                <div class="card-header">
                    @if($isDoctor)
                    Start Conversation With Patient
                    @else
                    Start Conversation With Doctor
                    @endif
                </div>

                <ul class="list-group list-group-flush">
                    @if($isDoctor)
                    @foreach ($patients::all() as $item)

                    <li name={{$item->fullName()}} photoUrl={{asset($item->userDetails->basic_details['avatar'])}}
                        onclick="chatWith(event)" id="{{$item->email}}" class="hoverable list-group-item">
                        {{"{$item->userDetails->basic_details['title']} {$item->fullName()}"}}
                    </li>
                    @endforeach

                    @else
                    @foreach ($doctors::getOnlyDoctors() as $item)
                    <li name={{$item->fullName()}} photoUrl={{asset($item->userDetails->basic_details['avatar'])}}
                        onclick="chatWith(event)" id="{{$item->email}}" class="hoverable list-group-item">
                        {{"Dr {$item->fullName()}"}}
                    </li>
                    @endforeach
                    @endif
                </ul>

            </div>
        </div>
        <div class="col h-100">
            <div id="talkjs-container" class="h-75 w-100">
                <i>Loading chat...</i>
            </div>
        </div>
    </div>
</div>

@endsection

@section('js')
<script>
    (function(t,a,l,k,j,s){
    s=a.createElement('script');s.async=1;s.src="https://cdn.talkjs.com/talk.js";a.head.appendChild(s)
    ;k=t.Promise;t.Talk={v:3,ready:{then:function(f){if(k)return new k(function(r,e){l.push([f,r,e])});l
    .push([f])},catch:function(){return k&&new k()},c:l}};})(window,document,[]);
</script>
<script>
    Talk.ready.then(function() {
    window.me = new Talk.User({
        id: "{{$user->email}}",
        name: "{{$user->fullName()}}",
        email: "{{$user->email}}",
        photoUrl: "{{asset($user->userDetails->basic_details['avatar'])}}",
    });
    window.talkSession = new Talk.Session({
        appId: "tAw95qzg",
        me: me
    });

    window.inbox = talkSession.createInbox();
    inbox.mount(document.getElementById("talkjs-container"));
});

function chatWith(event){
    let target = event.currentTarget;
    conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId("{{$user->email}}", target.id));
    conversation.setParticipant(me);
    conversation.setParticipant(new Talk.User({
        id: target.id,
        name: target.getAttribute('name'),
        email: target.id,
        photoUrl: target.getAttribute('photoUrl')
        }));
    inbox.select(conversation);

}
</script>
@endsection