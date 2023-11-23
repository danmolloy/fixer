import { EventInstrumentWithMusiciansWithMusician } from "./fixing";

export type InstrumentationShorthandProps = {
  instrumentSections: EventInstrumentWithMusiciansWithMusician[]
}

export default function InstrumentationShorthand(props) {
  const { instrumentSections } = props;
  return (
    <div data-testid="instrumentation-shorthand" >
      <div className="flex flex-row">
      <div data-testid="winds-shorthand" className="flex flex-row">
        <p data-testid="flute-num-to-book" >{instrumentSections.find(i => i.instrumentName.toLowerCase() === "flute").numToBook}.</p>
        <p data-testid="oboe-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "oboe").numToBook}.</p> 
        <p data-testid="clarinet-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "clarinet").numToBook}.</p>
        <p data-testid="bassoon-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "bassoon").numToBook}/</p>
      </div>
      <div data-testid="brass-shorthand" className="flex flex-row">
        <p data-testid="horn-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "horn").numToBook}.</p>
        <p data-testid="trumpet-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "trumpet").numToBook}.</p>
        <p data-testid="trombone-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "trombone").numToBook}.</p>
        <p data-testid="tuba-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "tuba").numToBook}/</p>
      </div>
      <div data-testid="percussion-shorthand" className="flex flex-row">
        <p data-testid="timpani-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "timpani").numToBook}T.</p>
        <p data-testid="percussion-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "percussion").numToBook}P.</p>
        <p data-testid="harp-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "harp").numToBook}H/</p>
      </div>
      <div data-testid="strings-shorthand" className="flex flex-row">
        <p data-testid="violin-1-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "violin 1").numToBook}.</p>
        <p data-testid="violin-2-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "violin 2").numToBook}.</p>
        <p data-testid="viola-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "viola").numToBook}.</p>
        <p data-testid="cello-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "cello").numToBook}.</p>
        <p data-testid="double-bass-num-to-book">{instrumentSections.find(i => i.instrumentName.toLowerCase() === "double bass").numToBook}</p>
      </div> 
      </div>

      
    </div>
  )
}