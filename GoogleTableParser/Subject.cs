using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace GoogleParser
{
    public class Subject
    {
        private string[] daysOfTheWeek = new string[] { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" };
        private string day;
        private string allInf;
        private List<string> groups = new List<string>();

        public string[] GetGroups()
        {
            return groups.ToArray();
        }

        [JsonPropertyName("Groups")]
        public string Groups
        {
            get
            {
                return String.Join(", ", groups);
            }
            set
            {
                groups.Add(value);
            }
        }

        public Subject(int day, string allInf, string groupNum)
        {
            this.day = daysOfTheWeek[day];
            this.allInf = allInf;
            groups.Add(groupNum);
        }

        [JsonPropertyName("DayOfWeek")]
        public string GetDay
        {
            get
            {
                return day;
            }
        }

        [JsonIgnore]
        public int Day
        {
            set
            {
                day = daysOfTheWeek[value];
            }
        }

        [JsonPropertyName("SubjectTeacherAudince")]
        public string AllInf
        {
            get
            {
                return allInf.ToString();
            }
            set
            {
                allInf = value;
            }
        }


        public override string ToString()
        {
            return $"{day} ___ {allInf}___{String.Join(", ", groups)}";
        }
    }
}

