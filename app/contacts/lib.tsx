
export const instrumentSections: {
  name: string
  group: "Woodwind"|"Brass"|"Percussion"|"Keyboard"|"Strings"
  id: string
  index: number
}[] = [
  {
    name: "Flute",
    group: "Woodwind",
    id: "flute-1",
    index: 1
  },
  {
    name: "Oboe",
    group: "Woodwind",
    id: "oboe-1",
    index: 2
  },
  {
    name: "Clarinet",
    group: "Woodwind",
    id: "clarinet-1",
    index: 3
  },
  {
    name: "Bassoon",
    group: "Woodwind",
    id: "bassoon-1",
    index: 4
  },
  {
    name: "Horn",
    group: "Brass",
    id: "horn-1",
    index: 5
  },
  {
    name: "Trumpet",
    group: "Brass",
    id: "trumpet-1",
    index: 6
  },
  {
    name: "Trombone",
    group: "Brass",
    id: "trombone-1",
    index: 7
  },
  {
    name: "Tuba",
    group: "Brass",
    id: "tuba-1",
    index: 8
  },
  {
    name: "Timpani",
    group: "Percussion",
    id: "timpani-1",
    index: 9
  },
  {
    name: "Percussion",
    group: "Percussion",
    id: "percussion-1",
    index: 10
  },
  {
    name: "Organ",
    group: "Keyboard",
    id: "organ-1",
    index: 11
  },
  {
    name: "Piano",
    group: "Keyboard",
    id: "piano-1",
    index: 12
  },
  {
    name: "Violin 1",
    group: "Strings",
    id: "violin-1",
    index: 13
  },
  {
    name: "Violin 2",
    group: "Strings",
    id: "violin-2",
    index: 14
  },
  {
    name: "Viola",
    group: "Strings",
    id: "viola-1",
    index: 15
  },
  {
    name: "Cello",
    group: "Strings",
    id: "cello-1",
    index: 16
  },
  {
    name: "Double Bass",
    group: "Strings",
    id: "dbass-1",
    index: 17
  },
];

export const rolesArr: {
  name: string
  id: string
  indexNum: number
}[] = [
  {
    name: "Principal",
    id: "prin",
    indexNum: 1
  },
  {
    name: "No. 2",
    id: "num-2",
    indexNum: 2
  },
  {
    name: "No. 3",
    id: "num-3",
    indexNum: 3
  },
  {
    name: "No. 4",
    id: "num-4",
    indexNum: 4
  },
  {
    name: "Tutti",
    id: "tutti-1",
    indexNum: 5
  }
];

export const categories:  {
  name: string
  id: string
  indexNum: number
}[] = [
  {
    name: "Member",
    id: "mem-1",
    indexNum: 1
  },
  {
    name: "Extra",
    id: "ext-1",
    indexNum: 2
  },
];