
fcViews.scheduleWeek = ScheduleWeekView;

function ScheduleWeekView(element, calendar) {
  var t = this;


  // exports
  t.render = render;


  // imports
  ScheduleView.call(t, element, calendar, 'scheduleWeek');
  var opt = t.opt;
  var renderSchedule = t.renderSchedule;
  var skipHiddenDays = t.skipHiddenDays;
  var getCellsPerWeek = t.getCellsPerWeek;
  var formatDates = calendar.formatDates;


  function render(date, delta) {
    var weeksToShow = 2;

    if (delta) {
      addDays(date, delta * 7 * weeksToShow);
    }

    var start = addDays(cloneDate(date), -((date.getDay() - opt('firstDay') + 7) % 7));
    var end = addDays(cloneDate(start), 7 * weeksToShow);

    var visStart = cloneDate(start);
    skipHiddenDays(visStart);

    var visEnd = cloneDate(end);
    skipHiddenDays(visEnd, -1, true);

    var colCnt = getCellsPerWeek() * weeksToShow;

    t.start = start;
    t.end = end;
    t.visStart = visStart;
    t.visEnd = visEnd;

    t.title = formatDates(
      visStart,
      addDays(cloneDate(visEnd), -1),
      opt('titleFormat')
    );

    renderSchedule(colCnt, false);
  }

}
