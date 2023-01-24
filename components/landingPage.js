import { useSession, signIn, signOut } from "next-auth/react"
import Header from "./header"



export default function LandingPage() {

  const smoothScroll = (target) => {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

  return (
    <div className="flex flex-col w-full outline ">
      <Header />
      <div id="landing-top-div" className="landing-page-div bg-gradient-to-b from-cyan-100 to-green-500">
        <h1 className="landing-page-h1">
          We connect fixers and musicians.
        </h1>
        <h2>Book an entire orchestra of freelancers in minutes.</h2>
        <h2>Be on the fixer's speed dial.</h2>
        <button className="signin-btn" onClick={() => smoothScroll(document.getElementById("fixer-landing"))}>
          I'm a fixer
        </button>
        <button className="signin-btn" onClick={() => smoothScroll(document.getElementById("player-landing"))}>
          I'm a player
        </button>
      </div>

      <div id="fixer-landing" className="bg-gradient-to-b from-green-500 to-cyan-100">
        <div className="landing-page-div ">
        <h1 className="landing-page-h1">
          Create an event in seconds. We handle the booking.
        </h1>
      </div>

      <div className="landing-page-div">
        <h1 className="landing-page-h1">
          Find players in our directory.
        </h1>
        <h2>Find your regular players or discover new ones.</h2>
      </div>

      <div className="landing-page-div ">
        <h1 className="landing-page-h1">
          Need a player ASAP?
        </h1>
      </div>
      <div className="landing-page-div ">
        <h1 className="landing-page-h1">
          Contact the entire orchestra.
        </h1>
        <button className="signin-btn bg-blue-500 hover:bg-blue-600 active:bg-blue-700" onClick={() => document.getElementById("landing-top-div").scrollIntoView()}>
            Back to top
          </button>
      </div>
      </div>
      <div id="player-landing" className=" bg-gradient-to-b from-cyan-100 to-cyan-500">
      <div className="landing-page-div">
        <h1 className="landing-page-h1">
          An affordable diary.
        </h1>
      </div>
      <div className="landing-page-div">
        <h1 className="landing-page-h1">
          Clear communication with the fixer.
        </h1>
      </div>
        <div className="landing-page-div">
          <h1 className="landing-page-h1">
            Be found by fixers.
          </h1>
        </div>
        <div className="landing-page-div ">
          <h1 className="landing-page-h1">
            All your gigs in the one place.
          </h1>
        </div>
        <div className="landing-page-div ">
          <h1 className="landing-page-h1">
            Never miss any info.
          </h1>
        </div>
        <div className="landing-page-div ">
          <h1 className="landing-page-h1">
            We'll find your dep.
          </h1>
        </div>
        <div className="landing-footer">
          <button className="signin-btn bg-blue-500 hover:bg-blue-600 active:bg-blue-700" onClick={() => document.getElementById("landing-top-div").scrollIntoView()}>
            Back to top
          </button>
        </div>
      </div>
    </div>
  )
}